import { useEffect, useState } from "react";
import { TempusServer } from "../types";

const API_ROOT = "https://tempus.xyz/api";

const fetchPath = (path: string) =>
  fetch(`${API_ROOT}/${path}`).then((res) => res.json());

const fetchServers = () => fetchPath("servers/statusList");

export const usePollServers = () => {
  const [servers, setServers] = useState<TempusServer[]>([]);
  useEffect(() => {
    fetchServers().then((res) => setServers(res));
    const interval = setInterval(() => {
      fetchServers().then((res) => setServers(res));
    }, 1000 * 60);
    return clearInterval(interval);
  });

  return servers.filter((s) => !s.server_info.hidden);
};
