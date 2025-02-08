import { getSetting } from "@/actions/setting/setting.action";
import ProductLists from "@/components/view/product/ProductLists";
import Image from "next/image";
import React from "react";

export const revalidate = 300;

export async function generateMetadata({}: {}) {
  const data = await getSetting();
  return {
    title: "Products" + " | " + data.setting?.storeName,
  };
}

export default async function ProductViewPage() {
  return (
    <div>
      <div>
        <Image
          src={"/banner/products.png"}
          width={1920}
          height={500}
          alt="promotion"
          className=" w-full h-[150px] md:h-auto object-cover"
        />
      </div>
      <ProductLists />
    </div>
  );
}
