import React, { FC, useContext } from "react";
import "./CartInfo.scss";
import AppContext from "../../context/AppContext";

interface Props {
  title: string;
  imageUrl: string;
  description: string;
}

export const CartInfo: FC<Props> = ({ title, imageUrl, description }) => {
  const state = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={imageUrl} alt="EmptyCart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        className="greenButton"
        onClick={() => state?.setCartOpened(false)}
      >
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
