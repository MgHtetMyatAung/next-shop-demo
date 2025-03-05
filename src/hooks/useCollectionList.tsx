import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export default function useCollectionList() {
  const fetchCollectionList = async () => {
    const res = await api.get("/product/collection");
    return res.data.collections;
  };
  const {
    data: collections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection-list"],
    queryFn: fetchCollectionList,
  });
  console.log(collections, "collections");
  return { collections: collections, isLoading, error };
}
