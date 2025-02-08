"use client";
import useAllProductList from "@/hooks/useAllProductList";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLists() {
  const { products, error, loading } = useAllProductList();
  const fakeArr = Array(10).fill(0);
  if (loading)
    return (
      <div className=" py-10 md:py-14">
        <div className=" container">
          <Skeleton className=" w-full h-[40px]"></Skeleton>
          <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
            {fakeArr?.map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error</div>;
  return (
    <div className=" py-10 md:py-14">
      <div className=" container">
        <h3 className=" text-lg md:text-2xl font-semibold">Our Products</h3>
        <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
