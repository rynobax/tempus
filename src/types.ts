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
    country: TempusCountry;
    addr: string;
    port: number;
    hidden: boolean;
  };
}

export enum TF2Class {
  SOLDIER = 3,
  DEMOMAN = 4,
}

export type TempusCountry =
  | "United States"
  | "Australia"
  | "Russia"
  | "Germany"
  | "France"
  | "New Zealand"
  | "Singapore"
  | "South Africa"
  | "South Korea";
