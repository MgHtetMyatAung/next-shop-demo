import { getSetting } from "@/actions/setting/setting.action";
import OurNewProducts from "@/components/view/home/OurNewProducts";
import Image from "next/image";
import React from "react";

export async function generateMetadata({}: {}) {
  const setting = await getSetting();
  return {
    title: "Home" + " | " + setting?.storeName,
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
          src="/banner/hero-banner-mb.png"
          alt="banner"
          width={1920}
          height={500}
          className=" w-full h-auto md:hidden"
        />
      </div>
      <div>
        <OurNewProducts />
      </div>
    </div>
  );
}
