import React from "react";
import Server from "./Server";
import { usePlayerStats, usePollServers } from "../services/tempus";
import { TempusCountry, TF2Class } from "../types";

interface BodyProps {
  filteredCountries: TempusCountry[];
  filterRankedServers: boolean;
}

const Body: React.FC<BodyProps> = ({
  filteredCountries,
  filterRankedServers,
}) => {
  const playerStats = usePlayerStats();
  const servers = usePollServers();

  const filteredServers = servers
    .filter((s) => !filteredCountries.includes(s.server_info.country))
    .filter((s) => {
      if (!filterRankedServers) return true;
      if (!playerStats) return true;
      const bestRank = Math.min(
        playerStats.class_rank_info[TF2Class.DEMOMAN].rank,
        playerStats.class_rank_info[TF2Class.SOLDIER].rank
      );
      const res = /Rank (?<rank>\d+) Only/.exec(s.server_info.name);
      const serverRankRequired = res?.groups?.rank;
      return serverRankRequired ? bestRank <= Number(serverRankRequired) : true;
    });

  return (
    <div className="container mx-auto flex flex-row flex-wrap justify-center">
      {filteredServers.map((server) => (
        <Server key={server.server_info.id} server={server} />
      ))}
    </div>
  );
};

export default Body;
