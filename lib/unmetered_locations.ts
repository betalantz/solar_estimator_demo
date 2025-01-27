// Define the type structure for a location
export interface Location {
  lat: number;
  long: number;
}

// Define the locales object with type safety
export const locales: Record<string, Location> = {
  "Sydney Opera House": { lat: -33.856784, long: 151.215297 },
  "Grand Canyon": { lat: 36.099763, long: -122.122485 },
  "Stonehenge": { lat: 51.178882, long: -1.826215 },
  "The Colosseum": { lat: 41.89021, long: 12.492231 },
  "Giza Pyramid": { lat: 29.977296, long: 31.132496 },
  "Taj Mahal": { lat: 27.175145, long: 78.042142 },
  "Fort Peck": { lat: 48.30783, long: -105.1017 },
  "Goodwin Creek": { lat: 34.2547, long: -89.8729 },
};