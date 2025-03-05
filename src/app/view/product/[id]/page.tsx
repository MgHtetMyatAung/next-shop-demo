import { getProductDetail } from "@/actions/product/product.action";
import { getSetting } from "@/actions/setting/setting.action";
import React from "react";
import ProductDetail from "./ProductDetail";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getProductDetail(Number(id));
  const data = await getSetting();
  return {
    title: post.product?.name + " | " + data.setting?.storeName,
    description: post.product?.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { product } = await getProductDetail(Number(params.id));
  if (!product) return <div>Product not found</div>;
  return (
    <div className=" py-7">
      <ProductDetail initialData={product} id={Number(params.id)} />
    </div>
  );
}
