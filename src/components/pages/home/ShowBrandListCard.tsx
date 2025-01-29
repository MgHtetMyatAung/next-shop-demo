import { getBrandCount } from "@/actions/brand/brand.action";
import Image from "next/image";
import React from "react";

export default async function ShowBrandListCard() {
  const brands = await getBrandCount();
  return (
    <div className=" p-5 rounded-lg bg-gray-200">
      <div className=" flex items-start gap-5 justify-between">
        <div>
          <h2 className=" text-2xl lg:text-4xl font-semibold">
            {brands.brandCount}
          </h2>
          <p>Brand</p>
        </div>
        <div>
          <Image
            src={"/logo/brand.png"}
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
