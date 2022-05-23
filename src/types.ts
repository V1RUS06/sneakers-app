export interface SneakersTypes {
  id: number;
  title: string;
  price: number | string;
  imageUrl: string;
}

export interface OrdersTypes {
  id: number;
  items: SneakersTypes[];
}
