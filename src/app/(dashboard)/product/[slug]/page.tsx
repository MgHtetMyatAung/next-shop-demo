import { getProductDetail } from "@/actions/product/product.action";
import BackBtn from "@/components/common/BackBtn";
import BreadCrumb from "@/components/common/BreadCrumb";
import ProductDetailBox from "@/components/pages/product/ProductDetailBox";
import VariantBox from "@/components/pages/product/VariantBox";
import Image from "next/image";
import React from "react";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { product } = await getProductDetail(Number(params.slug));
  return (
    <div>
      {product && (
        <BreadCrumb
          title={product.name}
          links={[{ name: "Products", link: "/product" }]}
        />
      )}
      {/* <div>
        <BackBtn />
      </div> */}

      <div className=" mt-5">
        <div className=" grid lg:grid-cols-12 gap-10">
          <div className=" lg:col-span-4">
            <div className=" w-full border">
              <Image
                src={"/img/shirt.png"}
                alt="product"
                width={500}
                height={500}
                className=" w-full h-auto"
              />
            </div>
          </div>
          <div className=" lg:col-span-8">
            <div className=" space-y-3">
              <h2 className=" lg:text-3xl font-medium">{product?.name}</h2>
              {product && (
                <ProductDetailBox
                  id={product.id}
                  brand={product.brand!}
                  category={product.category!}
                  price={product.price}
                  stock={product.stock}
                />
              )}
            </div>
          </div>
        </div>
        <div className=" my-3 space-y-3">
          <h3 className=" lg:text-xl">Description</h3>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
            provident explicabo a sunt dolorum cupiditate sequi similique
            nesciunt cum maiores dolorem omnis fuga assumenda perferendis odio
            cumque esse, tempore unde repellat? Voluptatem nulla iste vero
            obcaecati sint amet.
          </p>
        </div>
      </div>
    </div>
  );
}
