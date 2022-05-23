import { createContext, Dispatch } from "react";
import { SneakersTypes } from "../types";

interface AppContextInterface {
  sneakers: SneakersTypes[];
  favorites: SneakersTypes[];
  cartSneakers: SneakersTypes[];
  isSneakersAdded: (id: number | string) => void;
  setCartOpened: Dispatch<boolean>;
  setCartSneakers: Dispatch<SneakersTypes[] | []>;
  onAddToFavorite: (obj: SneakersTypes) => void;
  onAddToCart: (obj: SneakersTypes) => void;
}

export const AppContext = createContext<AppContextInterface | null>(null);

export default AppContext;
