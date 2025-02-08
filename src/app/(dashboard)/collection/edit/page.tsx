import { getCollectionById } from "@/actions/collection/collection.action";
import BackBtn from "@/components/common/BackBtn";
import EditCollectionForm from "@/components/pages/collection/EditCollectionForm";
import React from "react";

export default async function EditCollectionPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data = await getCollectionById(Number(searchParams.id));
  // console.log(data, "data", searchParams.id);
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">Edit Category</h3>
        </div>
        {data.collection && <EditCollectionForm collection={data.collection} />}
      </div>
    </div>
  );
}
