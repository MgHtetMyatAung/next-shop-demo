import ShowBrandListCard from "@/components/pages/home/ShowBrandListCard";
import ShowCategoryListCard from "@/components/pages/home/ShowCategoryListCard";
import ShowProductListCard from "@/components/pages/home/ShowProductListCard";
import ShowPromotionListCard from "@/components/pages/home/ShowPromotionListCard";
import { CustomerViewChart } from "@/components/pages/order/CustomerViewChart";
import { OrderViewChart } from "@/components/pages/order/OrderViewChart";

export default function Home() {
  return (
    <div className=" space-y-5">
      <div className=" grid lg:grid-cols-12 gap-5">
        <div className=" lg:col-span-3">
          <ShowBrandListCard />
        </div>
        <div className=" lg:col-span-3">
          <ShowCategoryListCard />
        </div>
        <div className=" lg:col-span-3">
          <ShowProductListCard />
        </div>
        <div className=" lg:col-span-3">
          <ShowPromotionListCard />
        </div>
      </div>
      <div className=" grid lg:grid-cols-12 gap-5">
        <div className=" lg:col-span-6">
          <OrderViewChart />
        </div>
        <div className=" lg:col-span-6">
          <CustomerViewChart />
        </div>
      </div>
    </div>
  );
}
