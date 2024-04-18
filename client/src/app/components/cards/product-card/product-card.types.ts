export type TProduct = {
  _id: string;
  name: string;
  description: string;
  photo: string;
  seller: string;
  categories: Array<string>;
  rating: number;
  price: number;
  creationDate: Date;
  _v: string;
};
