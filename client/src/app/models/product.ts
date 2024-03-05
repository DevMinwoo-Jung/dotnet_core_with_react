export interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  pictureUrl: string,
  type?: string,
  brand: string,
  quantityInStock?: number
}

export interface ProductProps {
  products: Product[],
}

export type SingleProduct = {
  product: Product
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}