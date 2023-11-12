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
  | "South Korea"
  | "Sweden"
  | "Brazil"
  | "Japan"
  | "United Arab Emirates"
  | "Bahrain"
  | "Hong Kong"
  | "United Kingdom";

export interface TempusSearchPlayer {
  id: string;
  name: string;
  steamid: string;
}

export interface TempusSearch {
  players: Array<TempusSearchPlayer>;
  maps: Array<unknown>;
}

export interface TempusPlayerStats {
  class_rank_info: {
    [TF2Class.DEMOMAN]: {
      rank: number;
    };
    [TF2Class.SOLDIER]: {
      rank: number;
    };
  };
  // there is lots of other fields
}
