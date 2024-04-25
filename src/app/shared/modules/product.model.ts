export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  active: boolean;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

