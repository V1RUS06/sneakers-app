import ReactDOM from "react-dom/client";
import App from "./App";
import "macro-css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
