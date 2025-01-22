"use client";

import { getAllCategory } from "@/actions/category/category.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategory();
      if (response.success && response.categories) {
        setCategories(response.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {
    categories,
    loading,
  };
}
