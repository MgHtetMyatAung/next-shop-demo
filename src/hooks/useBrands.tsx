"use client";

import { getBrands } from "@/actions/brand/brand.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const getBrand = async () => {
    setLoading(true);
    try {
      const response = await getBrands();
      if (response.success && response.brands) {
        setBrands(response.brands);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);
  return { brands, loading };
}
