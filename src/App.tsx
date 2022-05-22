import React from "react";
import { Header } from "./components/Header";
import { SneakersCard } from "./components/Card";

function App() {
  return (
    <div className="wrapper clear">
      <Header />
      <div className="content p-40 ">
        <h1>Все кроссовки</h1>
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
