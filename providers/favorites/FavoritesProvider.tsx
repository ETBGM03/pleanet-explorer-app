import {
  createContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "@constants";
import { Planet } from "@types";

export interface FavoriteContextProps {
  favorites: Planet[];
  getAll: () => Promise<Planet[]>;
  addFavorite: (planet: Planet) => Promise<void>;
  removeFavorite: (planetId: string) => Promise<void>;
  isFavorite: (planetId: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextProps | null>(null);

export function FavoriteContextProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Planet[]>([]);

  const getFavoritesParsed = async (): Promise<Planet[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY.favorite);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing favorites:", error);
      return [];
    }
  };

  const persistFavorites = async (newFavorites: Planet[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY.favorite,
        JSON.stringify(newFavorites)
      );
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const getAll = useCallback(async () => {
    const parsed = await getFavoritesParsed();
    setFavorites(parsed);
    return parsed;
  }, []);

  const addFavorite = useCallback(async (planet: Planet) => {
    const current = await getFavoritesParsed();
    const exists = current.some((p) => p.id === planet.id);
    if (!exists) {
      const updated = [...current, planet];
      await persistFavorites(updated);
    }
  }, []);

  const removeFavorite = useCallback(async (planetId: string) => {
    const current = await getFavoritesParsed();
    const updated = current.filter((p) => p.id !== planetId);
    await persistFavorites(updated);
  }, []);

  const isFavorite = useCallback(
    (planetId: string) => favorites.some((p) => p.id === planetId),
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      getAll,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, getAll, addFavorite, removeFavorite, isFavorite]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
