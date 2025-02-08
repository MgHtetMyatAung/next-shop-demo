"use client";

import { getAllProductLists } from "@/actions/product/product.action";
import { useEffect, useState } from "react";

export default function useAllProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProductLists();
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
  }, []);
  return {
    products,
    loading,
    error,
  };
}
