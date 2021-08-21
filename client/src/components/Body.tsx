import React from "react";
import Server from "./Server";
import { usePollServers } from "../services/tempus";

interface BodyProps {}

const Body: React.FC<BodyProps> = (props) => {
  const servers = usePollServers();
  return (
    <div className="container mx-auto flex flex-row flex-wrap">
      {servers.map((server) => (
        <Server key={server.server_info.id} server={server} />
      ))}
    </div>
  );
};

export default Body;
