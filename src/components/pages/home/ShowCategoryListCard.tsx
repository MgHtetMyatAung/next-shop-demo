import { getCategoryCount } from "@/actions/category/category.action";
import { getProductCount } from "@/actions/product/product.action";
import Image from "next/image";
import React from "react";

export default async function ShowCategoryListCard() {
  const category = await getCategoryCount();
  return (
    <div className=" p-5 rounded-lg bg-green-100">
      <div className=" flex items-start gap-5 justify-between">
        <div>
          <h2 className=" text-2xl lg:text-4xl font-semibold">
            {category.categoryCount}
          </h2>
          <p>Category</p>
        </div>
        <div>
          <Image
            src={"/logo/category.png"}
            alt="product"
            width={100}
            height={100}
            className=" size-10"
          />
        </div>
      </div>
    </div>
  );
}
