import BackBtn from "@/components/common/BackBtn";
import CreatePromotionForm from "@/components/pages/promotion/CreatePromotionForm";
import React from "react";

export default function CreatePromotionPage() {
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">
            Create New Promotion
          </h3>
        </div>
        <CreatePromotionForm />
      </div>
    </div>
  );
}
