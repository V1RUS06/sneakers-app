import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CardSneakers } from "./components/Card/CardSneakers";
import Drawer from "./components/Drawer";
import { SneakersTypes } from "./types";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [sneakers, setSneakers] = useState<SneakersTypes[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchSneakers = await axios.get(
        "https://60d8c024eec56d00174774c1.mockapi.io/items"
      );
      setSneakers(fetchSneakers.data);
    };
    fetchData();
  }, []);

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
          {sneakers.map((item) => (
            <CardSneakers {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
