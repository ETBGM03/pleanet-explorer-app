import { Planet } from "@/types";

export function transformPlanetDataFavorites(
  data: Planet[] | undefined,
  isFavorite: (id: string) => boolean
): Planet[] {
  if (!data) return [];
  return data.map((planet) => ({
    ...planet,
    isFavorite: isFavorite(planet.id!),
  }));
}

export function filterAndSortPlanets(
  planets: Planet[],
  searchTerm: string,
  sortAscending: boolean
): Planet[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filtered = normalizedSearch
    ? planets.filter((planet) =>
        planet.name?.toLowerCase().includes(normalizedSearch)
      )
    : planets;

  return [...filtered].sort((a, b) => {
    const nameA = a.name?.toLowerCase() ?? "";
    const nameB = b.name?.toLowerCase() ?? "";
    return sortAscending
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}

export function getPlanetAcronym(name: string): string {
  if (!name) return "";

  const upperName = name.trim().toUpperCase();

  if (upperName.length === 1) return upperName + "X";

  return upperName[0] + upperName[upperName.length - 1];
}
