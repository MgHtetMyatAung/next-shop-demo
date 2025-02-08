import { getProductDetail } from "@/actions/product/product.action";
import { getSetting } from "@/actions/setting/setting.action";
import BreadCrumb from "@/components/common/BreadCrumb";
import ProductDetailBox from "@/components/pages/product/ProductDetailBox";
import Image from "next/image";
import React from "react";

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
      <div className=" container">
        {product && (
          <BreadCrumb
            title={product.name}
            links={[{ name: "Products", link: "/view/product" }]}
            homeRoute="/view"
          />
        )}
        {/* <div>
            <BackBtn />
          </div> */}

        <div className=" mt-5">
          <div className=" grid lg:grid-cols-12 gap-3 md:gap-10">
            <div className=" lg:col-span-4 xl:col-span-3">
              <div className=" w-full border relative">
                <Image
                  src={product?.image || "/img/default.png"}
                  alt="product"
                  width={400}
                  height={400}
                  className=" w-full h-auto"
                />
                {product.promotion && product.promotion.type === "BUY1GET1" && (
                  <div className=" absolute bottom-0 left-0 right-0 p-1 rounded-t-md bg-red-500 text-white text-center text-sm font-semibold">
                    BUY 1 GET 1
                  </div>
                )}
              </div>
            </div>
            <div className=" lg:col-span-8 xl:col-span-9">
              <div className=" space-y-2 md:space-y-3">
                <h2 className=" text-lg lg:text-xl font-medium">
                  {product?.name}
                </h2>
                {product && (
                  <ProductDetailBox
                    id={product.id}
                    brand={product.brand!}
                    category={product.category!}
                    price={product.price}
                    stock={product.stock}
                    promotion={product.promotion}
                  />
                )}
              </div>
            </div>
          </div>
          <div className=" my-3 space-y-3">
            <h3 className=" text-base lg:text-xl">Description</h3>
            <p className=" text-gray-600 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
              provident explicabo a sunt dolorum cupiditate sequi similique
              nesciunt cum maiores dolorem omnis fuga assumenda perferendis odio
              cumque esse, tempore unde repellat? Voluptatem nulla iste vero
              obcaecati sint amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
