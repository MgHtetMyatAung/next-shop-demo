"use client";
import React from "react";
import ProductCard from "../product/ProductCard";
import useCollectionList from "@/hooks/useCollectionList";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionProducts() {
  const { error, collections, loading } = useCollectionList();
  const fakeArr = new Array(5).fill(0);
  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
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
      {collections.map((collection) => (
        <div className=" container mt-12 lg:mt-16" key={collection.id}>
          <h3 className=" text-lg md:text-2xl font-semibold">
            {collection.name}
          </h3>
          <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
            {collection.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
