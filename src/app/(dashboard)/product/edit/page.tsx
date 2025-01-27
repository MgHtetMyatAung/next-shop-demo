import { getProductDetail } from "@/actions/product/product.action";
import BackBtn from "@/components/common/BackBtn";
import EditProductForm from "@/components/pages/product/EditProductForm";
import React from "react";

export default async function EditProductPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data = await getProductDetail(Number(searchParams.id));
  return (
    <div>
      <BackBtn />
      {data.product && <EditProductForm product={data.product} />}
    </div>
  );
}
