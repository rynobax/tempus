import { TempusCountry } from "../types";

const flagUrl = (code: string) =>
  `https://www.countryflags.io/${code}/flat/48.png`;

export function getFlagSrc(country: TempusCountry) {
  switch (country) {
    case "United States":
      return flagUrl("us");
    case "Australia":
      return flagUrl("au");
    case "Russia":
      return flagUrl("ru");
    case "Germany":
      return flagUrl("de");
    case "France":
      return flagUrl("fr");
    case "New Zealand":
      return flagUrl("nz");
    case "Singapore":
      return flagUrl("sg");
    case "South Africa":
      return flagUrl("za");
    case "South Korea":
      return flagUrl("kr");
    case "Sweden":
      return flagUrl("se");
    case "Brazil":
      return flagUrl("br");
    default:
      console.error("Missing country ", country);
      return "";
  }
}
