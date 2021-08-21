import React, { useState } from "react";
import Dialog from "@reach/dialog";

import "@reach/dialog/styles.css";

import Body from "./components/Body";
import Header from "./components/Header";
import Filters from "./components/Filters";
import { UserIdProvider } from "./services/tempus";
import { TempusCountry } from "./types";

function App() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<TempusCountry[]>(
    []
  );

  const toggleCountry = (country: TempusCountry) => {
    if (filteredCountries.includes(country))
      setFilteredCountries(filteredCountries.filter((c) => c !== country));
    else setFilteredCountries([...filteredCountries, country]);
  };

  function openFilters() {
    setFiltersOpen(true);
  }
  function openLogin() {}

  return (
    <UserIdProvider value="74181">
      <div className="min-h-screen min-w-full bg-gray-500">
        <Header
          openFilters={openFilters}
          openLogin={openLogin}
          playerName={null}
        />
        <Body />
        <Dialog isOpen={filtersOpen} onDismiss={() => setFiltersOpen(false)}>
          <Filters
            filteredCountries={filteredCountries}
            toggleCountry={toggleCountry}
          />
        </Dialog>
      </div>
    </UserIdProvider>
  );
}

export default App;
