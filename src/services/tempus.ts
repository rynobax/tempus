import { createContext, useContext, useEffect, useState } from "react";
import {
  TempusPlayerStats,
  TempusSearch,
  TempusServer,
  TF2Class,
} from "../types";

const API_ROOT = "https://tempus2.xyz/api";

const UserIdContext = createContext<string | null>(null);

export const UserIdProvider = UserIdContext.Provider;

const useUserId = () => {
  const userId = useContext(UserIdContext);
  return userId;
};

function fetchPath<T>(path: string): Promise<T> {
  return fetch(`${API_ROOT}/${path}`).then((res) => res.json());
}

const fetchServers = () => fetchPath<TempusServer[]>("servers/statusList");

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
  map: string;
  demo: { rank: number | undefined; tier: number };
  soldier: { rank: number | undefined; tier: number };
}

const fetchMapInfo = async (map: string, userId: string): Promise<MapInfo> => {
  const [demo, soldier] = await Promise.all(
    [TF2Class.DEMOMAN, TF2Class.SOLDIER].map((tf2Class) =>
      fetchPath<TempusMapRecord>(
        `maps/name/${map}/zones/typeindex/map/1/records/player/${userId}/${tf2Class}`
      )
    )
  );
  return {
    map,
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
    let cancelled = false;
    if (userId && map) {
      fetchMapInfo(map, userId).then((info) => {
        if (!cancelled) setMapInfo(info);
      });
    } else {
      setMapInfo(null);
    }
    return () => {
      cancelled = true;
    };
  }, [userId, map]);

  if (mapInfo?.map === map) return mapInfo;
  else return null;
};

export const searchForPlayer = (search: string) =>
  fetchPath<TempusSearch>(`search/playersAndMaps/${search}`);

export const fetchPlayerInfo = (playerId: string) =>
  fetchPath<TempusPlayerStats>(`players/id/${playerId}/stats`);

export const usePlayerStats = () => {
  const userId = useUserId();
  const [playerInfo, setPlayerInfo] = useState<TempusPlayerStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (userId) {
      fetchPlayerInfo(userId).then((info) => {
        if (!cancelled) setPlayerInfo(info);
      });
    } else {
      setPlayerInfo(null);
    }
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return playerInfo;
};
