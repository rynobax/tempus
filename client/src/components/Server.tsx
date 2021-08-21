import React from "react";
import { TempusServer } from "../types";

interface ServerProps {
  server: TempusServer;
}

const Server: React.FC<ServerProps> = ({ server }) => {
  return (
    <div>
      {server.game_info?.hostname || server.server_info.name}
      {server.game_info?.currentMap}
      (connect button)
    </div>
  );
};

export default Server;
