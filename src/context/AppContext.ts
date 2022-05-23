import { createContext, Dispatch } from "react";
import { SneakersTypes } from "../types";

interface AppContextInterface {
  sneakers: SneakersTypes[];
  favorites: SneakersTypes[];
  cartSneakers: SneakersTypes[];
  isSneakersAdded: (id: number | string) => void;
  setCartOpened: Dispatch<boolean>;
  setCartSneakers: Dispatch<SneakersTypes[] | []>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

export default AppContext;
