import BackBtn from "@/components/common/BackBtn";
import CreateProductForm from "@/components/pages/product/CreateProductForm";
import React from "react";

export default function CreateProductPage() {
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">
            Create New Product
          </h3>
        </div>
        <CreateProductForm />
      </div>
    </div>
  );
}
