import { getVariantByProductId } from "@/actions/variant/variant.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useProductVariants({
  productId,
}: {
  productId: number;
}) {
  const [data, setData] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const [reFresh, setReFresh] = useState(false);
  const getProductVariantLists = async () => {
    setLoading(true);
    try {
      const response = await getVariantByProductId(productId);
      if (response.success && response.variants) {
        setData(response.variants);
      }
    } catch (error) {
      toast.error(" something wrong");
    } finally {
      setLoading(false);
    }
  };

  const reFocus = () => setReFresh((prev) => !prev);

  useEffect(() => {
    getProductVariantLists();
  }, [reFresh, productId]);
  return { data, loading, reFocus };
}
