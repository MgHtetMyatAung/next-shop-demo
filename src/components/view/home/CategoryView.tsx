"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useMainCategory from "@/hooks/useMainCategory";

export default function CategoryView() {
  const { categories, loading, error } = useMainCategory();
  const fakeArr = Array.from({ length: 10 });
  if (loading)
    return (
      <div className="container space-y-3 py-5 ">
        <Skeleton className=" w-full h-[40px]"></Skeleton>
        <div className=" w-full overflow-x-auto mb-3">
          <div className="category-list flex whitespace-nowrap gap-3 pb-2">
            {fakeArr.map((_, idx) => (
              <div key={idx} className=" flex-none">
                <Skeleton className=" w-[100px] h-[45px] rounded-full"></Skeleton>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error</div>;
  return (
    <div className=" space-y-3 py-5 ">
      <h3 className=" container text-lg md:text-2xl font-semibold ">
        Categories
      </h3>
      <div className=" px-[1rem] sm:px-0 sm:container w-full overflow-x-auto mb-3">
        <div className="category-list flex whitespace-nowrap gap-3 pb-2">
          {categories.map((category) => (
            <div key={category.id} className=" flex-none">
              <button className=" py-2 px-5 rounded-full border shadow bg-gray-100 text-yellow-950 font-[600]">
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
