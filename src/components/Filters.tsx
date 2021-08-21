import React from "react";
import { TempusCountry } from "../types";

const countries: TempusCountry[] = [
  "United States",
  "Australia",
  "Russia",
  "Germany",
  "France",
  "New Zealand",
  "Singapore",
  "South Africa",
  "South Korea",
];

interface FiltersProps {
  filteredCountries: TempusCountry[];
  toggleCountry: (country: TempusCountry) => void;
}

const Filters: React.FC<FiltersProps> = ({
  toggleCountry,
  filteredCountries,
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
                  onClick={() => toggleCountry(country)}
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
    </div>
  );
};

export default Filters;
