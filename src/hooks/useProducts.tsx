"use client";
import { getProducts } from "@/actions/product/product.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useProducts({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const getProductLists = async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        page,
        limit,
      });
      if (data.success && data.products) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      }
    } catch (error) {
      toast.error(" something wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductLists();
  }, [page, limit]);
  return { products, loading, totalPages, totalItems };
}
