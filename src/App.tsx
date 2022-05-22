import React, { useState } from "react";
import { Header } from "./components/Header";
import { CardSneakers } from "./components/Card/CardSneakers";
import Drawer from "./components/Drawer";

function App() {
  const [cartOpened, setCartOpened] = useState<boolean>(false);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      <Header onOpenCart={() => setCartOpened(true)} />
      <div className="content p-40 ">
        <div className="d-flex justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap mt-25">
          <CardSneakers />
          <CardSneakers />
          <CardSneakers />
          <CardSneakers />
          <CardSneakers />
        </div>
      </div>
    </div>
  );
}

export default App;
