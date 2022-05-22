import React, { ChangeEvent, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CardSneakers } from "./components/Card/CardSneakers";
import Drawer from "./components/Drawer";
import { SneakersTypes } from "./types";
import axios from "axios";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import Favorites from "./pages/Favorites";

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
      const fetchFavorites = await axios.get(
        "https://60d8c024eec56d00174774c1.mockapi.io/favorites"
      );
      setSneakers(fetchSneakers.data);
      setCartSneakers(fetchCartSneakers.data);
      setFavorites(fetchFavorites.data);
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

  const onAddToFavorite = async (obj: SneakersTypes) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://60d8c024eec56d00174774c1.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prevState) =>
          prevState.filter((item) => item.id !== obj.id)
        );
      } else {
        const { data } = await axios.post(
          "https://60d8c024eec56d00174774c1.mockapi.io/favorites",
          obj
        );
        setFavorites((prevState) => [...prevState, data]);
      }
    } catch (e) {
      console.log("Не удалось добавить в избранные");
    }
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
      <Route path="/" exact>
        <Home
          sneakers={sneakers}
          cartSneakers={cartSneakers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          onClearSearchInput={onClearSearchInput}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites favorites={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
