export enum EProductState {
  'Out Of Stock',
  'In Stock',
}

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  categories: Array<{
    _id: string;
    name: string;
  }>;
  description: string;
  images: Array<string>;
  state: EProductState;
  seller: {
    _id: string;
    name: string;
  };
  quantity: number;
  creationDate?: Date;
};
