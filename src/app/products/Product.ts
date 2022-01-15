export interface IProduct {
  id?: number;
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  tags?: string[];
}

export interface IProductResolved {
  product: IProduct | null;
  errors?: any;
}
