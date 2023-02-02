import React, {FC, useEffect, useState} from 'react';
import {CardSneakers} from '../components/Card/CardSneakers';
import axios from 'axios';
import {OrdersTypes, SneakersTypes} from '../types';

const Orders: FC = () => {
  const [orders, setOrders] = useState<SneakersTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const {data} = await axios.get(
          'https://60d8c024eec56d00174774c1.mockapi.io/orders',
        );
        const allOrders = data.reduce(
          (prev: SneakersTypes[], obj: OrdersTypes) => [...prev, ...obj.items],
          [],
        );

        setOrders(allOrders);
        setIsLoading(false);
      } catch (e) {
        console.log('Ошибка при получении истории заказов');
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="content p-40 ">
      <div className="d-flex justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap mt-25">
        {isLoading
          ? [...Array(8)]
          : orders.map((item, index) => (
              <CardSneakers {...item} key={index} loading={isLoading} />
            ))}
      </div>
    </div>
  );
};

export default Orders;
