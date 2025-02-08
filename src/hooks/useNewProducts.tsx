"use client";

import { getLatestProducts } from "@/actions/product/product.action";
import { useEffect, useState } from "react";

export default function useNewProducts(limit: number) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getLatestProducts(limit);
      if (res.success && res.products) {
        setProducts(res.products);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);
  return {
    products,
    loading,
    error,
  };
}
