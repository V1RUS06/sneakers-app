import React, { ChangeEvent, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CardSneakers } from "./components/Card/CardSneakers";
import Drawer from "./components/Drawer";
import { SneakersTypes } from "./types";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [sneakers, setSneakers] = useState<SneakersTypes[] | []>([]);
  const [cartSneakers, setCartSneakers] = useState<SneakersTypes[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [favorites, setFavorites] = useState<SneakersTypes[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchSneakers = await axios.get(
        "https://60d8c024eec56d00174774c1.mockapi.io/items"
      );
      const fetchCartSneakers = await axios.get(
        "https://60d8c024eec56d00174774c1.mockapi.io/cart"
      );
      setSneakers(fetchSneakers.data);
      setCartSneakers(fetchCartSneakers.data);
    };
    fetchData();
  }, []);

  const onAddToCart = (obj: SneakersTypes) => {
    if (cartSneakers.find((item) => item.id === obj.id)) {
      return;
    } else {
      axios.post("https://60d8c024eec56d00174774c1.mockapi.io/cart", obj);
      setCartSneakers((prevState) => [...prevState, obj]);
    }
  };

  const onRemoveItem = (id: number) => {
    axios.delete(`https://60d8c024eec56d00174774c1.mockapi.io/cart/${id}`);
    setCartSneakers((prevState) => prevState.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onClearSearchInput = () => {
    setSearchValue("");
  };

  const onAddToFavorite = (obj: SneakersTypes) => {
    axios.post("https://60d8c024eec56d00174774c1.mockapi.io/favorites", obj);
    setFavorites((prevState) => [...prevState, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onClose={() => setCartOpened(false)}
          items={cartSneakers}
          onRemove={onRemoveItem}
        />
      )}
      <Header onOpenCart={() => setCartOpened(true)} />
      <div className="content p-40 ">
        <div className="d-flex justify-between">
          <h1>
            {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="removeBtn cu-p clear"
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={onClearSearchInput}
              />
            )}
            <input
              type="text"
              placeholder="Поиск..."
              onChange={onChangeSearchInput}
              value={searchValue}
            />
          </div>
        </div>
        <div className="d-flex flex-wrap mt-25">
          {sneakers
            .filter((elem) =>
              elem.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <CardSneakers
                {...item}
                key={item.id}
                onAddToCart={() => onAddToCart(item)}
                onAddToFavorite={() => onAddToFavorite(item)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
