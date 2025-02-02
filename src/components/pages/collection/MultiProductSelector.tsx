"use client";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import React from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function MultiProductSelector({
  selectedProducts,
  handleChange,
  loading,
  products,
}: {
  selectedProducts: any;
  handleChange: (products: any) => void;
  loading: boolean;
  products: any;
}) {
  return (
    <div className=" space-y-2">
      <Label>Select Products</Label>
      <Select
        options={products}
        value={selectedProducts}
        isMulti
        isLoading={loading}
        onChange={handleChange}
      />
    </div>
  );
}
