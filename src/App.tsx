import React, { ChangeEvent, useEffect, useState } from "react";
import { Header } from "./components/Header";

import Drawer from "./components/Drawer";
import { SneakersTypes } from "./types";
import axios from "axios";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from "./context/AppContext";
import Orders from "./pages/Orders";

function App() {
  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [sneakers, setSneakers] = useState<SneakersTypes[] | []>([]);
  const [cartSneakers, setCartSneakers] = useState<SneakersTypes[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [favorites, setFavorites] = useState<SneakersTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchCartSneakers, fetchFavorites, fetchSneakers] =
          await Promise.all([
            axios.get("https://60d8c024eec56d00174774c1.mockapi.io/cart"),
            axios.get("https://60d8c024eec56d00174774c1.mockapi.io/favorites"),
            axios.get("https://60d8c024eec56d00174774c1.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartSneakers(fetchCartSneakers.data);
        setFavorites(fetchFavorites.data);
        setSneakers(fetchSneakers.data);
      } catch (e) {
        console.log("Ошибка при запросе данных", e);
      }
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj: SneakersTypes) => {
    try {
      const findItem = cartSneakers.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        setCartSneakers((prevState) =>
          prevState.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://60d8c024eec56d00174774c1.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartSneakers((prevState) => [...prevState, obj]);
        const { data } = await axios.post(
          "https://60d8c024eec56d00174774c1.mockapi.io/cart",
          obj
        );
        setCartSneakers((prevState: any) =>
          prevState.map((item: any) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (e) {
      console.log("Ошибка при добавлении в корзину");
    }
  };

  const onRemoveItem = (id: number) => {
    try {
      axios.delete(`https://60d8c024eec56d00174774c1.mockapi.io/cart/${id}`);
      setCartSneakers((prevState) =>
        prevState.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (e) {
      console.log("Ошибка при удалении из корзины", e);
    }
  };

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onClearSearchInput = () => {
    setSearchValue("");
  };

  const onAddToFavorite = async (obj: SneakersTypes) => {
    try {
      if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://60d8c024eec56d00174774c1.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prevState) =>
          prevState.filter((item) => Number(item.id) !== Number(obj.id))
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

  const isSneakersAdded = (id: number | string) => {
    return cartSneakers.some(
      (obj: SneakersTypes) => Number(obj.parentId) === Number(id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        favorites,
        cartSneakers,
        isSneakersAdded,
        setCartOpened,
        setCartSneakers,
        onAddToCart,
        onAddToFavorite,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpened(false)}
          items={cartSneakers}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
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
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
