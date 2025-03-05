"use client";
import React from "react";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProductCollections } from "@/config/fetch/product-collections";

export default function CollectionProducts() {
  const {
    data: collections,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await getProductCollections();
      return res;
    },
  });
  const fakeArr = new Array(5).fill(0);
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return (
      <div className=" container mt-12 lg:mt-16">
        <Skeleton className=" w-full h-[40px]"></Skeleton>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
          {fakeArr?.map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      {collections?.map((collection: any) => (
        <div className=" container mt-12 lg:mt-16" key={collection.id}>
          <h3 className=" text-lg md:text-2xl font-semibold">
            {collection.name}
          </h3>
          <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
            {collection.products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
