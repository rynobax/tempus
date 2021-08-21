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

interface MapRecord {
  result: { rank: number } | null;
  tier_info: Record<TF2Class, number>;
}

const fetchRank = async (map: string, userId: string): Promise<Ranks> => {
  const [demo, soldier] = await Promise.all<MapRecord>(
    [TF2Class.DEMOMAN, TF2Class.SOLDIER].map((tf2Class) =>
      fetchPath(
        `maps/name/${map}/zones/typeindex/map/1/records/player/${userId}/${tf2Class}`
      )
    )
  );
  return { demo: demo.result?.rank, soldier: soldier.result?.rank };
};

interface Ranks {
  demo: number | undefined;
  soldier: number | undefined;
}

export const useRanks = (map: string | undefined) => {
  const userId = useUserId();
  const [ranks, setRanks] = useState<Ranks | null>(null);

  useEffect(() => {
    if (userId && map) {
      fetchRank(map, userId).then(setRanks);
    } else {
      setRanks(null);
    }
  }, [userId]);

  return ranks;
};
