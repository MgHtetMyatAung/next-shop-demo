"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/view/product/ProductCard";
import ProductCardSkeleton from "@/components/view/product/ProductCardSkeleton";
import useAllPromotionList from "@/hooks/useAllPromotionList";

export default function PromotionList() {
  const { promotions, error, loading } = useAllPromotionList();
  const fakeArr = new Array(5).fill(0);
  if (loading)
    return (
      <>
        {fakeArr.map((promotion) => (
          <div className=" container mt-10 md:mt-16" key={promotion.id}>
            <Skeleton className=" w-full h-[40px]"></Skeleton>
            <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
              {fakeArr?.map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  if (error) return <div>Error</div>;
  return (
    <>
      {promotions.map((promotion) => (
        <div className=" container mt-10 md:mt-16" key={promotion.id}>
          <h3 className=" text-lg md:text-2xl font-semibold">
            {promotion.title}
          </h3>
          <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
            {promotion.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
