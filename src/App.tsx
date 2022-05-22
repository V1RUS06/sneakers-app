import React from "react";
import { Header } from "./components/Header";
import { SneakersCard } from "./components/Card/CardSneakers";
import { CardBasket } from "./components/Card/CardBasket";

function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30">Корзина</h2>
          <div className="items">
            <CardBasket />
            <CardBasket />
            <CardBasket />
            <CardBasket />
          </div>
        </div>
      </div>
      <Header />
      <div className="content p-40 ">
        <div className="d-flex justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap mt-25">
          <SneakersCard />
          <SneakersCard />
          <SneakersCard />
          <SneakersCard />
          <SneakersCard />
        </div>
      </div>
    </div>
  );
}

export default App;
