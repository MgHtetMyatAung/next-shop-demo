"use client";

import { getMainCategories } from "@/actions/category/category.action";
import { useEffect, useState } from "react";

export default function useMainCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getMainCategories();
      if (res.success && res.categories) {
        setCategories(res.categories);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return {
    categories,
    loading,
    error,
  };
}
