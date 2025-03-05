import { getAllPromotions } from "@/actions/promotion/promotion.action";
import { useQuery } from "@tanstack/react-query";

export default function useAllPromotionList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allPromotionList"],
    queryFn: async () => await getAllPromotions(),
  });

  return {
    promotions: data?.promotions || [],
    loading: isLoading,
    error: error,
  };
}
