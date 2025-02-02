import BackBtn from "@/components/common/BackBtn";
import CreateCollectionForm from "@/components/pages/collection/CreateCollectionForm";
import React from "react";

export default function CreateCollectionPage() {
  return (
    <div>
      <BackBtn />
      <div className=" p-3 space-y-3">
        <div>
          <h3 className=" text-lg sm:text-2xl font-medium">
            Create New Collection
          </h3>
        </div>
        <CreateCollectionForm />
      </div>
    </div>
  );
}
