import React, { FC, useContext } from "react";
import { CardSneakers } from "../components/Card/CardSneakers";
import { SneakersTypes } from "../types";
import AppContext from "../context/AppContext";

interface Props {
  onAddToFavorite: (obj: SneakersTypes) => void;
}

const Favorites: FC<Props> = ({ onAddToFavorite }) => {
  const state = useContext(AppContext);

  return (
    <div className="content p-40 ">
      <div className="d-flex justify-between">Мои закладки</div>
      <div className="d-flex flex-wrap mt-25">
        {state?.favorites.map((item: any) => (
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
