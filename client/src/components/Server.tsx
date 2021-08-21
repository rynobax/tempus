import React from "react";
import { useRanks } from "../services/tempus";
import { TempusServer } from "../types";

interface ServerProps {
  server: TempusServer;
}

const Server: React.FC<ServerProps> = ({ server }) => {
  const ranks = useRanks(server.game_info?.currentMap);
  return (
    <div>
      {server.game_info?.hostname || server.server_info.name}
      {server.game_info?.currentMap}
      {JSON.stringify(ranks)}
      (connect button)
    </div>
  );
};

export default Server;
