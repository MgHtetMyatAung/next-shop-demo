import { getLatestProducts } from "@/actions/product/product.action";
import { useQuery } from "@tanstack/react-query";

export default function useNewProducts(limit: number) {
  const getDatas = async () => {
    const res = await getLatestProducts(limit);
    return res.products;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getDatas,
    refetchOnWindowFocus: false,
  });

  return {
    products: data,
    loading: isLoading,
    error: error,
  };
}
