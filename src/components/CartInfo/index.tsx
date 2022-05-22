import React, { FC } from "react";
import "./CartInfo.scss";

interface Props {
  title: string;
  imageUrl: string;
  description: string;
  onClose: () => void;
}

export const CartInfo: FC<Props> = ({
  title,
  imageUrl,
  description,
  onClose,
}) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={imageUrl} alt="EmptyCart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={onClose}>
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
