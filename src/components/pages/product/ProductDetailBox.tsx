"use client";

import { useEffect, useState } from "react";
import VariantBox from "./VariantBox";
import useProductVariants from "@/hooks/useProductVariants";

export default function ProductDetailBox({
  brand,
  category,
  price,
  stock,
  id,
}: {
  brand: Brand;
  category: CategoryType;
  price: number;
  stock: number;
  id: number;
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
      <p className=" lg:text-xl font-semibold">{fixPrice} MMK</p>
      {brand && (
        <div className=" space-x-3">
          <span>Brand :</span>
          <span className=" font-semibold">{brand?.name}</span>
        </div>
      )}
      {category && (
        <div className=" space-x-3">
          <span>Category :</span>
          <span className=" font-semibold">{category?.name}</span>
        </div>
      )}
      <div className=" space-y-2">
        <p>Stock</p>
        <button className=" py-2 px-5 border rounded-full">
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
