import { getAllPromotions } from "@/actions/promotion/promotion.action";
import ProductCard from "@/components/view/product/ProductCard";
import Image from "next/image";
import PromotionList from "./PromotionList";

export const revalidate = 300;

export default async function page() {
  return (
    <div className="">
      <div>
        <Image
          src={"/banner/promo.png"}
          width={1920}
          height={500}
          alt="promotion"
          className=" w-full h-[150px] md:h-auto object-cover"
        />
      </div>
      <PromotionList />
    </div>
  );
}
