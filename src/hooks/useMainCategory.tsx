import { getMainCategories } from "@/actions/category/category.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useMainCategory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mainCategory"],
    queryFn: async () => await getMainCategories(),
  });

  return {
    categories: data?.categories || [],
    loading: isLoading,
    error: error,
  };
}
