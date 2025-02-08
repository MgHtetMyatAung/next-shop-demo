"use client";

import { getAllPromotions } from "@/actions/promotion/promotion.action";
import { useEffect, useState } from "react";

export default function useAllPromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const res = await getAllPromotions();
      if (res.success && res.promotions) {
        setPromotions(res.promotions);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
  return {
    promotions,
    loading,
    error,
  };
}
