type ProductType = {
  id?: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId?: number | null;
  brandId?: number | null;
  published: boolean;
  out_of_stock: boolean;
};
