type Collection = {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  products: Product[];
  productIds?: number[] | null;
};
