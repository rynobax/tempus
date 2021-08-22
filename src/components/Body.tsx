import React from "react";
import Server from "./Server";
import { usePollServers } from "../services/tempus";
import { TempusCountry } from "../types";

interface BodyProps {
  filteredCountries: TempusCountry[];
}

const Body: React.FC<BodyProps> = ({ filteredCountries }) => {
  const servers = usePollServers().filter(
    (s) => !filteredCountries.includes(s.server_info.country)
  );
  return (
    <div className="container mx-auto flex flex-row flex-wrap justify-center">
      {servers.map((server) => (
        <Server key={server.server_info.id} server={server} />
      ))}
    </div>
  );
};

export default Body;
