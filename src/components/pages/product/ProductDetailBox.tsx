"use client";

import { useEffect, useState } from "react";
import VariantBox from "./VariantBox";
import useProductVariants from "@/hooks/useProductVariants";

type PromotionType = {
  id: number;
  code?: string;
  title: string;
  description?: string | null;
  type: "DISCOUNT" | "CASHBACK" | "BUY1GET1";
  discount?: number | null;
  cashback?: number | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
};

export default function ProductDetailBox({
  brand,
  category,
  price,
  stock,
  id,
  promotion,
}: {
  brand: Brand;
  category: CategoryType;
  price: number;
  stock: number;
  id: number;
  promotion?: PromotionType | null;
}) {
  const { data: productVariants, loading } = useProductVariants({
    productId: id,
  });
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [fixPrice, setFixPrice] = useState(price);

  useEffect(() => {
    if (productVariants) {
      const targetData = productVariants.find(
        (variant) => variant.color === color && variant.size === size
      );
      if (targetData) {
        setFixPrice(price + targetData.price);
      }
    }
  }, [color, size]);

  return (
    <>
      <div>
        {promotion && (
          <p className=" lg:text-xl font-semibold">
            {promotion.type === "DISCOUNT" && promotion.discount
              ? `${fixPrice - (fixPrice * promotion?.discount) / 100} MMK`
              : promotion.type === "CASHBACK" && promotion.cashback
              ? `${fixPrice - promotion.cashback} MMK`
              : null}
          </p>
        )}
        <div className=" flex items-center gap-2">
          <p
            className={`  ${
              promotion && promotion.type !== "BUY1GET1"
                ? " text-sm line-through text-gray-500"
                : " lg:text-xl font-semibold"
            }`}
          >
            {fixPrice} MMK
          </p>
          {promotion && (
            <p className=" text-sm text-red-500">
              {promotion.type === "DISCOUNT" && promotion.discount
                ? `${promotion.discount}% OFF`
                : promotion.type === "CASHBACK" && promotion.cashback
                ? `Save ${promotion.cashback} MMK`
                : null}
            </p>
          )}
        </div>
      </div>
      {brand && (
        <div className=" space-x-3 text-sm md:text-base">
          <span>Brand :</span>
          <span className=" font-[500]">{brand?.name}</span>
        </div>
      )}
      {category && (
        <div className=" space-x-3 text-sm md:text-base">
          <span>Category :</span>
          <span className=" font-[500]">{category?.name}</span>
        </div>
      )}
      <div className=" flex items-center gap-2 text-sm md:text-base">
        <p>Stock</p>
        <button className=" py-2 px-5 border rounded-full font-[500]">
          {stock} items
        </button>
      </div>
      <div>
        <VariantBox
          productId={id!}
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
        />
      </div>
    </>
  );
}
