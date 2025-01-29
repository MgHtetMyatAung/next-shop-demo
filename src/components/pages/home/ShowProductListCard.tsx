import { getProductCount } from "@/actions/product/product.action";
import Image from "next/image";
import React from "react";

export default async function ShowProductListCard() {
  const productCounts = await getProductCount();
  return (
    <div className=" p-5 rounded-lg bg-blue-100">
      <div className=" flex items-start gap-5 justify-between">
        <div>
          <h2 className=" text-2xl lg:text-4xl font-semibold">
            {productCounts.productCount}
          </h2>
          <p>Product</p>
        </div>
        <div>
          <Image
            src={"/logo/product.png"}
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
