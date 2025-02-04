import { getAllCollections } from "@/actions/collection/collection.action";
import React from "react";
import ProductCard from "../product/ProductCard";

export default async function CollectionProducts() {
  const { success, collections } = await getAllCollections();
  if (!success) {
    return <div>Error</div>;
  }
  if (!collections) {
    return null;
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
