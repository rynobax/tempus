import React from "react";
import { getFlagSrc } from "../services/flag";
import { useMapInfo } from "../services/tempus";
import { TempusServer } from "../types";

const GOOD_COLOR = "bg-green-100";
const BAD_COLOR = "bg-orange-100";

interface ServerProps {
  server: TempusServer;
}

const Server: React.FC<ServerProps> = ({ server }) => {
  const mapInfo = useMapInfo(server.game_info?.currentMap);
  const serverName = server.server_info.name;
  const mapName = server.game_info?.currentMap || "Offline";

  const demoRank = mapInfo?.demo.rank;
  const soldierRank = mapInfo?.soldier.rank;

  const demoTier = mapInfo ? `T${mapInfo?.demo.tier}` : "";
  const soldierTier = mapInfo ? `T${mapInfo?.soldier.tier}` : "";

  const players = server.game_info
    ? `${server.game_info.playerCount} / ${server.game_info.maxPlayers}`
    : "-";

  const full = server.game_info
    ? server.game_info.playerCount >= server.game_info.maxPlayers
    : false;

  const playersColor = !full ? BAD_COLOR : GOOD_COLOR;

  const connectString = `steam://connect/${server.server_info.addr}:${server.server_info.port}`;

  return (
    <div className="flex flex-col flex-0 w-64 h-36 bg-gray-50 m-4 rounded overflow-hidden shadow	">
      <div className="flex flex-row h-12 items-center p-2 border-b-2">
        <div className="flex-1 font-header font-bold overflow-hidden overflow-ellipsis">
          {mapName}
        </div>
        <img className="" src={getFlagSrc(server.server_info.country)} />
      </div>
      <div className="flex flex-row h-full">
        <div className="w-1/2 h-full">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex p-1">
              <div className="flex-0 text-sm">S {soldierTier}</div>
              <div className="flex-1 font-bold text-3xl text-center self-end">
                {soldierRank ? `#${soldierRank}` : "-"}
              </div>
            </div>
            <div className="flex-1 flex p-1">
              <div className="flex-0 text-sm">D {demoTier}</div>
              <div className="flex-1 font-bold text-3xl text-center self-end">
                {demoRank ? `#${demoRank}` : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2">
          <div className="flex flex-col">
            <div className="flex-1">
              <a className="text-sm underline text-right" href={connectString}>
                {serverName}
              </a>
            </div>
            <div className={`flex-1 ${playersColor} text-center`}>
              {players}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Server;
