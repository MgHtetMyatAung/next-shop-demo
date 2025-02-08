import { getLatestProducts } from "@/actions/product/product.action";
import Image from "next/image";
import React from "react";
import ProductCard from "../product/ProductCard";

export default async function OurNewProducts() {
  const { success, products } = await getLatestProducts(8);
  if (!success) {
    return <div>Error</div>;
  }
  return (
    <div className=" container mt-10 md:mt-12">
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
