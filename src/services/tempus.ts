import { createContext, useContext, useEffect, useState } from "react";
import { TempusRank, TempusServer, TF2Class } from "../types";

const API_ROOT = "https://tempus.xyz/api";

const UserIdContext = createContext<string | null>(null);

export const UserIdProvider = UserIdContext.Provider;

const useUserId = () => {
  const userId = useContext(UserIdContext);
  return userId;
};

const fetchPath = (path: string) =>
  fetch(`${API_ROOT}/${path}`).then((res) => res.json());

const fetchServers = () => fetchPath("servers/statusList");

export const usePollServers = () => {
  const [servers, setServers] = useState<TempusServer[]>([]);
  useEffect(() => {
    fetchServers().then(setServers);
    const interval = setInterval(() => {
      fetchServers().then(setServers);
    }, 1000 * 15);
    return () => clearInterval(interval);
  }, []);

  return servers.filter((s) => !s.server_info.hidden);
};

interface TempusMapRecord {
  result: { rank: number } | null;
  tier_info: Record<TF2Class, number>;
}

interface MapInfo {
  demo: { rank: number | undefined; tier: number };
  soldier: { rank: number | undefined; tier: number };
}

const fetchMapInfo = async (map: string, userId: string): Promise<MapInfo> => {
  const [demo, soldier] = await Promise.all<TempusMapRecord>(
    [TF2Class.DEMOMAN, TF2Class.SOLDIER].map((tf2Class) =>
      fetchPath(
        `maps/name/${map}/zones/typeindex/map/1/records/player/${userId}/${tf2Class}`
      )
    )
  );
  return {
    demo: { rank: demo.result?.rank, tier: demo.tier_info[TF2Class.DEMOMAN] },
    soldier: {
      rank: soldier.result?.rank,
      tier: demo.tier_info[TF2Class.SOLDIER],
    },
  };
};

export const useMapInfo = (map: string | undefined) => {
  const userId = useUserId();
  const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);

  useEffect(() => {
    if (userId && map) {
      fetchMapInfo(map, userId).then(setMapInfo);
    } else {
      setMapInfo(null);
    }
  }, [userId]);

  return mapInfo;
};
