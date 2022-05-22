import React, { useState } from "react";
import "./CardSneakers.scss";

export const SneakersCard = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const onFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="favorite">
        <img
          src={isFavorite ? "..//img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
          onClick={onFavoriteClick}
        />
      </div>
      <img width={133} height={112} src="/img/sneakers/1.jpg" alt="" />
      <h5> Мужские Кроссовки Nike Blazer Mid Suede </h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена: </span>
          <b>228 </b>
        </div>
        <img className="plus" src={"/img/btn-unchecked.svg"} alt="Plus" />
      </div>
    </div>
  );
};
