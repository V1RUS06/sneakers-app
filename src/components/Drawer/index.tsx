import React, { FC, useContext, useState } from "react";
import "./Drawer.scss";
import { CardBasket } from "../Card/CardBasket";
import { SneakersTypes } from "../../types";
import { CartInfo } from "../CartInfo";
import AppContext from "../../context/AppContext";
import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Props {
  onClose: () => void;
  onRemove: (id: number) => void;
  items: SneakersTypes[] | [];
  opened: boolean;
}

const Drawer: FC<Props> = ({ onClose, items, onRemove, opened }) => {
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | number | null>(null);
  const state = useContext(AppContext);
  const totalPrice = state?.cartSneakers.reduce(
    (sum, obj) => Number(obj.price) + sum,
    0
  );

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://60d8c024eec56d00174774c1.mockapi.io/orders`,
        { items: state?.cartSneakers }
      );

      if (state?.cartSneakers) {
        for (let i = 0; i < state?.cartSneakers.length; i++) {
          const item = state?.cartSneakers[i];
          await axios.delete(
            `https://60d8c024eec56d00174774c1.mockapi.io/cart/` + item?.id
          );
          await delay(1000);
        }
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      state?.setCartSneakers([]);
    } catch (e) {
      console.log("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`overlay ${opened ? "overlayVisible" : ""}`}>
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
                  <b>{totalPrice} р.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div />
                  <b>{totalPrice && Math.round(totalPrice * 0.05)} руб. </b>
                </li>
              </ul>
              <button
                className="greenButton"
                onClick={onClickOrder}
                disabled={isLoading}
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <CartInfo
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ норме ${orderId} скоро будет передан курьерской доставке`
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
