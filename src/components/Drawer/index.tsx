import React, { FC, useState } from "react";
import "./Drawer.scss";
import { CardBasket } from "../Card/CardBasket";
import { SneakersTypes } from "../../types";
import { CartInfo } from "../CartInfo";

interface Props {
  onClose: () => void;
  onRemove: (id: number) => void;
  items: SneakersTypes[] | [];
}

const Drawer: FC<Props> = ({ onClose, items, onRemove }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);

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

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((item) => (
                <CardBasket
                  key={item.id}
                  sneakersData={item}
                  onRemove={onRemove}
                />
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
          </>
        ) : (
          <CartInfo
            onClose={onClose}
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            imageUrl={
              isOrderComplete ? "img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
