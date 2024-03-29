import React, { FC, useContext, useState } from "react";
import "./CardSneakers.scss";
import { SneakersTypes } from "../../../types";
import ContentLoader from "react-content-loader";
import AppContext from "../../../context/AppContext";

interface Props extends SneakersTypes {
  onAddToCart?: (obj: SneakersTypes) => void;
  onAddToFavorite?: (obj: SneakersTypes) => void;
  favorite?: boolean;
  loading: boolean;
}

export const CardSneakers: FC<Props> = ({
  id,
  title,
  price,
  imageUrl,
  onAddToCart,
  onAddToFavorite,
  favorite = false,
  loading = false,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const state = useContext(AppContext);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onAddClick = () => {
    if (onAddToCart) {
      onAddToCart(obj);
    }
  };

  const onFavoriteClick = () => {
    if (onAddToFavorite) {
      onAddToFavorite(obj);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite">
            {onAddToFavorite && (
              <img
                src={isFavorite ? "..//img/liked.svg" : "/img/unliked.svg"}
                alt="Unliked"
                onClick={onFavoriteClick}
              />
            )}
          </div>
          <img width={133} height={112} src={`${imageUrl}`} alt="" />
          <h5> {title} </h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена: </span>
              <b>{price} руб.</b>
            </div>
            {onAddToCart && (
              <img
                className="plus"
                src={
                  state?.isSneakersAdded(id)
                    ? "/img/btn-checked.svg"
                    : "/img/btn-unchecked.svg"
                }
                alt="Plus"
                onClick={onAddClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
