"use client";
import React from "react";
import ProductCard from "../product/ProductCard";
import useNewProducts from "@/hooks/useNewProducts";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function OurNewProducts() {
  const { error, products, loading } = useNewProducts(5);
  const fakeArr = new Array(5).fill(0);
  if (loading) {
    return (
      <div className=" container mt-5 md:mt-10">
        <Skeleton className=" w-full h-[40px]"></Skeleton>
        <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
          {fakeArr?.map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className=" container mt-5 md:mt-10">
      <h3 className=" text-lg md:text-2xl font-semibold">
        Our Latest Products
      </h3>
      <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
