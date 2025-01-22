import { getCategoryById } from "@/actions/category/category.action";
import BackBtn from "@/components/common/BackBtn";
import EditCategoryForm from "@/components/pages/category/EditCategoryForm";
import React from "react";

export default async function EditCategoryPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data = await getCategoryById(Number(searchParams.id));
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">Edit Category</h3>
        </div>
        {data.category && <EditCategoryForm category={data.category} />}
      </div>
    </div>
  );
}
