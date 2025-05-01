import { useContext } from "react";
import { FavoriteContext, FavoriteContextProps } from "./FavoritesProvider";

export const useFavorites = (): FavoriteContextProps => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavorites must be used within a FavoriteContextProvider"
    );
  }
  return context;
};
