import React, { FC } from "react";
import "./CardBasket.scss";
import { SneakersTypes } from "../../../types";

interface Props {
  sneakersData: SneakersTypes | null;
  onRemove: (id: number) => void;
}

export const CardBasket: FC<Props> = ({ sneakersData, onRemove }) => {
  return (
    <div className="cartItem d-flex align-center">
      <div
        className="cartItemImg"
        style={{ backgroundImage: `url(${sneakersData?.imageUrl})` }}
      />
      <div className="mr-20 flex">
        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
        <b>12 999 руб.</b>
      </div>
      <img
        className="removeBtn"
        src="/img/btn-remove.svg"
        alt="Remove"
        onClick={
          sneakersData
            ? () => onRemove(sneakersData.id)
            : () => console.log("Ошибка")
        }
      />
    </div>
  );
};
