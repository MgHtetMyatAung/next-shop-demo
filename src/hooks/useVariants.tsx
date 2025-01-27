import { getVariants } from "@/actions/variant/variant.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useVariants() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const getVariant = async () => {
    setLoading(true);
    try {
      const response = await getVariants();
      if (response.success && response.variants) {
        setVariants(response.variants);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVariant();
  }, []);
  return { variants, loading };
}
