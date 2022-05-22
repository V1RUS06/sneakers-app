import React from "react";
import "./CardBasket.scss";

export const CardBasket = () => {
  return (
    <div className="cartItem d-flex align-center">
      <div
        className="cartItemImg"
        style={{ backgroundImage: "url(img/sneakers/1.jpg)" }}
      />
      <div className="mr-20 flex">
        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
        <b>12 999 руб.</b>
      </div>
      <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
    </div>
  );
};
