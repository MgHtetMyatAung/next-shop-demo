type Promotion = {
  id: number;
  code?: string;
  title: string;
  description?: string | null;
  type: "DISCOUNT" | "CASHBACK" | "BUY1GET1";
  discount?: number | null;
  cashback?: number | null;
  isBOGO?: boolean | null;
  isActive?: boolean | null;
  imageUrl?: string | null;
  startDate: Date;
  endDate: Date;
  products: Product[];
  productIds?: number[];
};
