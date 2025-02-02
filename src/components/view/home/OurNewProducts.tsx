import { getLatestProducts } from "@/actions/product/product.action";
import Image from "next/image";
import React from "react";

export default async function OurNewProducts() {
  const { success, products } = await getLatestProducts(8);
  if (!success) {
    return <div>Error</div>;
  }
  return (
    <div className=" container mt-10">
      <h3 className=" text-lg md:text-2xl font-semibold">
        Our Latest Products
      </h3>
      <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {products?.map((product) => (
          <div
            key={product.id}
            className=" border rounded-md overflow-hidden shadow"
          >
            <div>
              <Image
                src={product.image || "/img/default.png"}
                alt={product.name}
                width={200}
                height={200}
                className=" w-full h-auto object-cover"
              />
            </div>
            <div className=" p-3">
              <h4 className=" font-semibold line-clamp-1">{product.name}</h4>
              <div className=" text-gray-600">
                <span className=" text-xs">Brand :</span>
                <span className=" text-xs font-semibold">
                  {product.brand?.name}
                </span>
              </div>
              <p className=" text-sm font-[500]">{product.price} MMK</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
