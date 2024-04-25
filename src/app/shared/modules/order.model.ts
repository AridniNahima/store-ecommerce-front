export interface Order {
  id: string;
  name: string;
  date: Date;
  shippingAddress: string;
  delivery: boolean;
  store: Store;
  items: any[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  openingHours: string;
}
