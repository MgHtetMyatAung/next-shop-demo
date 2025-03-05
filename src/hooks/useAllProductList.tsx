import { getAllProductLists } from "@/actions/product/product.action";
import { useQuery } from "@tanstack/react-query";

export default function useAllProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allProductList"],
    queryFn: async () => await getAllProductLists(),
  });

  return {
    products: data?.products || [],
    loading: isLoading,
    error: error,
  };
}
