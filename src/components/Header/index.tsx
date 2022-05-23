import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import AppContext from "../../context/AppContext";

interface Props {
  onOpenCart: () => void;
}

export const Header: FC<Props> = ({ onOpenCart }) => {
  const state = useContext(AppContext);

  const totalPrice = state?.cartSneakers.reduce(
    (sum, obj) => Number(obj.price) + sum,
    0
  );
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            className="mr-10"
            width={40}
            height={40}
            alt="img"
            src="/img/logo.png"
          />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p d-flex" onClick={onOpenCart}>
          <img width={18} height={18} src="/img/shop.svg" alt="Корзина" />
          <div className="shop_current-price"> {totalPrice} руб. </div>
        </li>
        <Link to="/favorites">
          <li className="mr-30 cu-p">
            <img width={18} height={18} src="/img/Heart.svg" alt="Закладки" />
          </li>
        </Link>

        <Link to="/orders">
          <li className="cu-p">
            <img width={18} height={18} src="/img/Me.svg" alt="Профиль" />
          </li>
        </Link>
      </ul>
    </header>
  );
};
