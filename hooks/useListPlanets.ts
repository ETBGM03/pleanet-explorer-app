import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { filterAndSortPlanets, transformPlanetDataFavorites } from "@/lib";
import { useFavorites } from "@/providers";
import { planetsService } from "@/services/planet.service";
import { Planet } from "@/types";

export function useListPlanets() {
  const { getAll, isFavorite } = useFavorites();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["planets"],
    queryFn: () => planetsService.getAll(),
  });
  useQuery({
    queryKey: ["favorites"],
    queryFn: () => getAll(),
  });

  const dataTransformed = useMemo(() => {
    return transformPlanetDataFavorites(data as Planet[], isFavorite);
  }, [data, isFavorite]);

  const filteredAndSortedData = useMemo(() => {
    return filterAndSortPlanets(dataTransformed, searchTerm, isAsc);
  }, [dataTransformed, searchTerm, isAsc]);

  return {
    refetch,
    setIsAsc,
    setSearchTerm,
    filteredAndSortedData,
    isLoading,
    error,
    searchTerm,
    isAsc,
  };
}
