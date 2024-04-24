export type TCategory = {
  _id: string;
  name: string;
  products: Array<string>;
  supcategory?: string;
  subcategories?: Array<string>;
};

export type TResponse = {
  status: number;
  message?: string;
  categories?: Array<TCategory>;
};
