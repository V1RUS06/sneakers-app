export interface SneakersTypes {
  id: number;
  title: string;
  price: number | string;
  imageUrl: string;
  parentId?: string | number;
}

export interface OrdersTypes {
  id: number;
  items: SneakersTypes[];
}
