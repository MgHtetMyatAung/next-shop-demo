import { getAllProducts } from "@/actions/product/product.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useAllProducts() {
  const [products, setProducts] = useState<{ label: string; value: number }[]>(
    []
  );
  const [reFresh, setReFresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      if (response.success && response.products) {
        const productsData = response.products.map((product) => ({
          label: product.name,
          value: product.id,
        }));
        setProducts(productsData);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [reFresh]);
  return { products, loading, reFocus: () => setReFresh((prev) => !prev) };
}
