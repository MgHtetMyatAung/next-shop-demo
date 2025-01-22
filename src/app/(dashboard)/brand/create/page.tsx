import BackBtn from "@/components/common/BackBtn";
import BrandCreateForm from "@/components/pages/brand/BrandCreateForm";
import React from "react";

export default function page() {
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3>Create New Brand</h3>
        </div>
        <BrandCreateForm />
      </div>
    </div>
  );
}
