import BackBtn from "@/components/common/BackBtn";
import CreateCategoryForm from "@/components/pages/category/CreateCategoryForm";
import React from "react";

export default function CreateCategoryPage() {
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">
            Create New Category
          </h3>
        </div>
        <CreateCategoryForm />
      </div>
    </div>
  );
}
