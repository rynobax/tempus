import React from "react";
import Server from "./Server";
import { usePollServers } from "../services/tempus";

interface BodyProps {}

const Body: React.FC<BodyProps> = (props) => {
  const servers = usePollServers();
  return (
    <div>
      {servers.map((server) => (
        <Server server={server} />
      ))}
    </div>
  );
};

export default Body;
