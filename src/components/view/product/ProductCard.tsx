"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: any) {
  // console.log(product, "pp");
  const router = useRouter();
  const goDetail = () => {
    router.push(`/view/product/${product.id}`);
  };
  return (
    <div className=" border rounded-md overflow-hidden shadow">
      <div className=" relative cursor-pointer" onClick={goDetail}>
        <Image
          src={product.image || "/img/default.png"}
          alt={product.name}
          width={200}
          height={200}
          className=" w-full h-auto object-cover"
        />
        {product.promotion && (
          <button className=" absolute top-0 left-0 p-1 rounded-br-md bg-red-500 text-white text-xs font-semibold">
            {product.promotion?.type === "DISCOUNT"
              ? `${product.promotion.discount}% OFF`
              : product.promotion?.type === "BUY1GET1"
              ? `BUY 1 GET 1`
              : product.promotion?.type === "CASHBACK"
              ? `Save ${product.promotion.cashback} MMK`
              : null}
          </button>
        )}
      </div>
      <div className=" p-3">
        <h4
          className=" font-semibold line-clamp-1 text-sm md:text-base cursor-pointer"
          onClick={goDetail}
        >
          {product.name}
        </h4>
        <div className=" text-gray-600">
          <span className=" text-xs">Brand : </span>
          <span className=" text-xs font-semibold">{product.brand?.name}</span>
        </div>
        <div className=" flex flex-wrap items-center gap-1">
          {product.promotion && product.promotion.type !== "BUY1GET1" && (
            <p className=" text-xs md:text-sm font-[500] text-red-500">
              {product.promotion.type === "DISCOUNT" &&
              product.promotion.discount
                ? `${
                    product.price -
                    (product.price * product.promotion?.discount) / 100
                  } MMK`
                : product.promotion.type === "CASHBACK" &&
                  product.promotion.cashback
                ? `${product.price - product.promotion.cashback} MMK`
                : null}
            </p>
          )}
          <p
            className={`font-[500] ${
              product.promotion && product.promotion.type !== "BUY1GET1"
                ? "line-through text-gray-500 text-xs"
                : "text-xs md:text-sm"
            }`}
          >
            {product.price} MMK
          </p>
        </div>
      </div>
    </div>
  );
}
