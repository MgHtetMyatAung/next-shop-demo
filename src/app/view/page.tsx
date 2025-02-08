import { getSetting } from "@/actions/setting/setting.action";
import AlertBox from "@/components/view/home/AlertBox";
import CategoryView from "@/components/view/home/CategoryView";
// import AlertBox from "@/components/view/home/AlertBox";
import CollectionProducts from "@/components/view/home/CollectionProducts";
import OurNewProducts from "@/components/view/home/OurNewProducts";
import Image from "next/image";
import React from "react";

export async function generateMetadata({}: {}) {
  const data = await getSetting();
  return {
    title: "Home" + " | " + data.setting?.storeName,
  };
}

export default function ViewPage() {
  return (
    <div>
      <div>
        <Image
          src="/banner/hero-banner.png"
          alt="banner"
          width={1920}
          height={500}
          className=" w-full h-auto hidden md:block"
        />
        <Image
          src="/banner/hero-banner.png"
          alt="banner"
          width={1920}
          height={500}
          className=" w-full h-[150px] object-cover md:hidden"
        />
      </div>
      <AlertBox />
      <CategoryView />
      <div>
        <OurNewProducts />
        <CollectionProducts />
      </div>
    </div>
  );
}
