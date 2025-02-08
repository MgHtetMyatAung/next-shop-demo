import { getAllPromotions } from "@/actions/promotion/promotion.action";
import ProductCard from "@/components/view/product/ProductCard";
import Image from "next/image";

export const revalidate = 300;

export default async function page() {
  const { success, promotions } = await getAllPromotions();
  if (!success) {
    return <div>Error</div>;
  }
  if (!promotions) {
    return (
      <div>
        <p>Promotion will be soon !</p>
      </div>
    );
  }
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
      {promotions.map((promotion) => (
        <div className=" container mt-10 md:mt-16" key={promotion.id}>
          <h3 className=" text-lg md:text-2xl font-semibold">
            {promotion.title}
          </h3>
          <div className=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
            {promotion.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
