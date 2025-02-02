"use client";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import React from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function PromotionTypeSelector({
  selectedPromotion,
  handleChange,
  loading,
  options,
}: {
  selectedPromotion: any;
  handleChange: (products: any) => void;
  loading?: boolean;
  options: { label: string; value: string }[];
}) {
  return (
    <div className=" min-w-[240px] space-y-2">
      <Label>Promotion Type</Label>
      <Select
        options={options}
        value={selectedPromotion}
        isLoading={loading}
        onChange={handleChange}
      />
    </div>
  );
}
