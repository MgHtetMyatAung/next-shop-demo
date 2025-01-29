import { getProductCount } from "@/actions/product/product.action";
import { getPromotionCount } from "@/actions/promotion/promotion.action";
import Image from "next/image";
import React from "react";

export default async function ShowPromotionListCard() {
  const promotion = await getPromotionCount();
  return (
    <div className=" p-5 rounded-lg bg-orange-100">
      <div className=" flex items-start gap-5 justify-between">
        <div>
          <h2 className=" text-2xl lg:text-4xl font-semibold">
            {promotion.promotionCount}
          </h2>
          <p>Promotion</p>
        </div>
        <div>
          <Image
            src={"/logo/megaphone.png"}
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
