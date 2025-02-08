import { getAllCollections } from "@/actions/collection/collection.action";
import React, { useEffect, useState } from "react";

export default function useCollectionList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await getAllCollections();
      if (res.success && res.collections) {
        setCollections(res.collections);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return {
    collections,
    loading,
    error,
  };
}
