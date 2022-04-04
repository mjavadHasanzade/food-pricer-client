interface IRowsCount<T> {
  count: number;
  rows: {
    id: number;
    node: T;
  }[];
}

interface IIngredient {
  id: number;
  name: string;
  quantity: number;
  price: number;
  qty?: number;
  isComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  Foods?: IFood[];
}

interface IFood {
  id: number;
  name: string;
  priceByIngredient: number;
  priceByRestaurant: number;
  benefit: number;
  createdAt?: string;
  updatedAt?: string;
  Ingredients?: IIngredient[];
}

interface ISelects {
  label: string;
  value: string | number | boolean;
}
[];

interface IPostIngredient {
  ingId: number;
  qty: number;
}
