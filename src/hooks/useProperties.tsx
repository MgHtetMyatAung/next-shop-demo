import { getProperties } from "@/actions/property/property.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const getProperty = async () => {
    setLoading(true);
    try {
      const response = await getProperties();
      if (response.success && response.properties) {
        setProperties(response.properties);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);
  return { properties, loading };
}
