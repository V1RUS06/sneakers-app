import React, { FC } from "react";
import { CardSneakers } from "../components/Card/CardSneakers";
import { SneakersTypes } from "../types";

const Home: FC<any> = ({
  sneakers,
  cartSneakers,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  onClearSearchInput,
}) => {
  return (
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
          .filter((elem: any) =>
            elem.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item: any) => (
            <CardSneakers
              {...item}
              key={item.id}
              onAddToCart={() => onAddToCart(item)}
              onAddToFavorite={() => onAddToFavorite(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
