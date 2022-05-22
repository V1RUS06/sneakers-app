import React, { FC } from "react";
import "./Drawer.scss";
import { CardBasket } from "../Card/CardBasket";
import { SneakersTypes } from "../../types";

interface Props {
  onClose?: () => void;
  items: SneakersTypes[] | [];
}

const Drawer: FC<Props> = ({ onClose, items }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{" "}
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={onClose}
          />
        </h2>

        <div className="items">
          {items.map((item) => (
            <CardBasket key={item.id} sneakersData={item} />
          ))}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex">
              <span>Итог:</span>
              <div />
              <b>24 484 р.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div />
              <b>1074 руб. </b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
