import React, { useState } from "react";
import Dialog from "@reach/dialog";

import "@reach/dialog/styles.css";

import { useLocalStorage } from "./services/localstorage";
import { UserIdProvider } from "./services/tempus";

import { TempusCountry, TempusPlayer } from "./types";

import Body from "./components/Body";
import Header from "./components/Header";
import Filters from "./components/Filters";
import PlayerId from "./components/PlayerId";

function App() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useLocalStorage<
    TempusCountry[]
  >("filteredCountries", []);

  const [playerIdOpen, setPlayerIdOpen] = useState(false);
  const [playerInfo, setPlayerInfo] = useLocalStorage<TempusPlayer | null>(
    "playerInfo",
    null
  );

  const toggleCountry = (country: TempusCountry) => {
    if (filteredCountries.includes(country))
      setFilteredCountries(filteredCountries.filter((c) => c !== country));
    else setFilteredCountries([...filteredCountries, country]);
  };

  function openFilters() {
    setFiltersOpen(true);
  }
  function openLogin() {
    setPlayerIdOpen(true);
  }

  return (
    <UserIdProvider value={playerInfo ? playerInfo.id : null}>
      <div className="min-h-screen min-w-full bg-gray-500">
        <Header
          openFilters={openFilters}
          openLogin={openLogin}
          playerName={playerInfo ? playerInfo.name : null}
        />
        <Body filteredCountries={filteredCountries} />
        <Dialog
          aria-label="filters"
          isOpen={filtersOpen}
          onDismiss={() => setFiltersOpen(false)}
        >
          <Filters
            filteredCountries={filteredCountries}
            toggleCountry={toggleCountry}
          />
        </Dialog>
        <Dialog
          aria-label="set-player-id"
          isOpen={playerIdOpen}
          onDismiss={() => setPlayerIdOpen(false)}
        >
          <PlayerId
            onClose={() => setPlayerIdOpen(false)}
            setPlayerInfo={setPlayerInfo}
          />
        </Dialog>
      </div>
    </UserIdProvider>
  );
}

export default App;
