interface IRowsCount<T> {
  count: number;
  rows: {
    node: T;
  }[];
}

interface IIngredient {
  id: number;
  name: string;
  quantity: number;
  price: number;
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
