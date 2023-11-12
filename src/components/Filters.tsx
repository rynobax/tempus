import React from "react";
import { TempusCountry } from "../types";

const countries: TempusCountry[] = (
  [
    "United States",
    "Australia",
    "Russia",
    "Germany",
    "France",
    "New Zealand",
    "Singapore",
    "South Africa",
    "South Korea",
    "Sweden",
    "Brazil",
    "Japan",
    "United Arab Emirates",
    "Bahrain",
    "Hong Kong",
    "United Kingdom",
  ] satisfies TempusCountry[]
).sort();

interface FiltersProps {
  filteredCountries: TempusCountry[];
  filterRankedServers: boolean;
  toggleCountry: (country: TempusCountry) => void;
  toggleFilterRankedServers: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filteredCountries,
  filterRankedServers,
  toggleCountry,
  toggleFilterRankedServers,
}) => {
  return (
    <div>
      <div className="font-header font-bold">Displayed Regions</div>
      <div>
        {countries.map((country) => {
          return (
            <div className="flex align-middle" key={country}>
              <div>
                <input
                  key={country}
                  type="checkbox"
                  checked={!filteredCountries.includes(country)}
                  onChange={() => toggleCountry(country)}
                />
              </div>
              <div
                className="ml-2 flex-0 cursor-pointer"
                onClick={() => toggleCountry(country)}
              >
                {country}
              </div>
            </div>
          );
        })}
      </div>
      <div className="font-header font-bold mt-4">Rank Filtering</div>
      <div className="flex align-middle">
        <div>
          <input
            type="checkbox"
            checked={filterRankedServers}
            onChange={() => toggleFilterRankedServers()}
          />
        </div>
        <div
          className="ml-2 flex-0 cursor-pointer"
          onClick={() => toggleFilterRankedServers()}
        >
          Filter servers above my rank
        </div>
      </div>
    </div>
  );
};

export default Filters;
