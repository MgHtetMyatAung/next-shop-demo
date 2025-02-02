import { getPromotionById } from "@/actions/promotion/promotion.action";
import BackBtn from "@/components/common/BackBtn";
import EditPromotionForm from "@/components/pages/promotion/EditPromotionForm";
import React from "react";

export default async function EditPromotionPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data = await getPromotionById(Number(searchParams.id));
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">Edit Category</h3>
        </div>
        {data.promotion && <EditPromotionForm promotion={data.promotion} />}
      </div>
    </div>
  );
}
