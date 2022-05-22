import App from "../App";
import Favorites from "../pages/Favorites";

export const Routes = [
  { path: "/", component: App, exact: true },
  { path: "/favorites", component: Favorites, exact: true },
];
