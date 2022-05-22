import React, { FC, useState } from "react";
import "./CardSneakers.scss";
import { SneakersTypes } from "../../../types";

interface Props extends SneakersTypes {
  onAddToCart: ({ id, title, imageUrl, price }: SneakersTypes) => void;
  onAddToFavorite: ({ id, title, imageUrl, price }: SneakersTypes) => void;
  favorite?: boolean;
}

export const CardSneakers: FC<Props> = ({
  id,
  title,
  price,
  imageUrl,
  onAddToCart,
  onAddToFavorite,
  favorite = false,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const onFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorite({ id, title, imageUrl, price });
  };

  const onAddClick = () => {
    setIsAdded(!isAdded);
    onAddToCart({ id, title, imageUrl, price });
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
      <img width={133} height={112} src={`${imageUrl}`} alt="" />
      <h5> {title} </h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>
        <img
          className="plus"
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-unchecked.svg"}
          alt="Plus"
          onClick={onAddClick}
        />
      </div>
    </div>
  );
};
