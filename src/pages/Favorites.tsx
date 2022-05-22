import React, { FC } from "react";
import { CardSneakers } from "../components/Card/CardSneakers";
import { SneakersTypes } from "../types";

interface Props {
  favorites: SneakersTypes[];
  onAddToFavorite: (obj: SneakersTypes) => void;
}

const Favorites: FC<Props> = ({ favorites, onAddToFavorite }) => {
  return (
    <div className="content p-40 ">
      <div className="d-flex justify-between">Мои закладки</div>
      <div className="d-flex flex-wrap mt-25">
        {favorites.map((item: any) => (
          <CardSneakers
            {...item}
            key={item.id}
            favorite={true}
            onAddToFavorite={onAddToFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
