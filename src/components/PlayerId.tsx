import React, { useState } from "react";
import { searchForPlayer } from "../services/tempus";
import { TempusSearchPlayer, TempusSearch } from "../types";

type SearchResults =
  | {
      state: "empty";
      results: null;
    }
  | { state: "loading"; results: null }
  | { state: "complete"; results: TempusSearch };

interface PlayerIdProps {
  onClose: () => void;
  setPlayerInfo: (player: TempusSearchPlayer) => void;
}

const PlayerId: React.FC<PlayerIdProps> = ({ onClose, setPlayerInfo }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    state: "empty",
    results: null,
  });

  async function doSearch() {
    setSearchResults({ state: "loading", results: null });
    const results = await searchForPlayer(search);
    setSearchResults({ state: "complete", results });
  }

  return (
    <div>
      <input
        className="border-2 p-1 rounded mr-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={() => console.log("submit")}
        onKeyDown={(e) => (e.key === "Enter" ? doSearch() : null)}
      />
      <button className="underline" onClick={doSearch}>
        Search
      </button>

      {searchResults.state !== "empty" && (
        <div>
          {searchResults.state === "loading" && "Loading..."}

          {searchResults.state === "complete" &&
            searchResults.results.players.map((player) => {
              return (
                <div className="my-1">
                  <button
                    key={player.id}
                    onClick={() => {
                      setPlayerInfo(player);
                      onClose();
                    }}
                  >
                    {player.name}
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PlayerId;
