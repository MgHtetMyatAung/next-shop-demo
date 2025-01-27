type ProductVariant = {
  id?: number;
  price: number;
  stock: number;
  image?: string | null;
  productId: number;
  variantId: number;
  propertyId: number;
  variant: Variant;
  property: Property;
};
