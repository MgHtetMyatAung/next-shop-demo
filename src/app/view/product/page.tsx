import { getAllProductLists } from "@/actions/product/product.action";
import { getSetting } from "@/actions/setting/setting.action";
import ProductCard from "@/components/view/product/ProductCard";
import React from "react";

export async function generateMetadata({}: {}) {
  const data = await getSetting();
  return {
    title: "Products" + " | " + data.setting?.storeName,
  };
}

export default async function ProductViewPage() {
  const { products } = await getAllProductLists();
  if (!products) return <div>Product not found</div>;
  return (
    <div className=" py-7">
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
