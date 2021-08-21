export interface TempusServer {
  game_info: {
    hostname: string;
    currentMap: string;
    nextMap: null;
    users: [];
    playerCount: number;
    maxPlayers: number;
    tempusVersion: number;
    spVersion: number;
    gameVersion: number;
    appID: number;
    freeDisk: number;
  } | null;
  server_info: {
    id: number;
    name: string;
    shortname: string;
    country: string;
    addr: string;
    port: number;
    hidden: boolean;
  };
}
