"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCategories from "@/hooks/useCategories";
import React, { useState } from "react";
import CategorySelector from "../category/CategorySelector";
import { useForm } from "react-hook-form";
import useBrands from "@/hooks/useBrands";
import BrandSelector from "../brand/BrandSelector";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/actions/product/product.action";
import toast from "react-hot-toast";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import AddVariantForm from "./AddVariantForm";
import ImageUpload from "@/components/common/ImageUpload";

export default function CreateProductForm() {
  const { loading, categories } = useCategories();
  const { brands } = useBrands();
  const { register, handleSubmit, control, reset } = useForm<ProductType>({});
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState<null | number>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const onSubmit = async (data: ProductType) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await createProduct({
        ...data,
        image: imgUrl,
      });
      if (response.success && response.product) {
        setProductId(response.product?.id);
        toast.success("Product created Successfully !");
        reset();
      }
    } catch (error) {
      toast.error("Something wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {productId ? (
          <h3 className=" text-lg sm:text-xl font-medium">Add Variant</h3>
        ) : (
          <h3 className=" text-lg sm:text-2xl font-medium">
            Create New Product
          </h3>
        )}
      </div>
      <div>
        {productId ? (
          <AddVariantForm productId={productId} />
        ) : (
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div className=" grid lg:grid-cols-12 gap-4 lg:gap-10">
              <div className=" lg:col-span-7 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    {...register("name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Product Description"
                    {...register("description")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Price</Label>
                  <Input
                    type="number"
                    placeholder="Product Price"
                    {...register("price")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Stock</Label>
                  <Input
                    type="number"
                    placeholder="Product Stock"
                    {...register("stock")}
                    required
                  />
                </div>
                <div className=" space-y-2 space-x-2">
                  <input
                    type="checkbox"
                    id="status"
                    {...register("out_of_stock")}
                  />
                  <Label
                    htmlFor="status"
                    className=" font-semibold cursor-pointer"
                  >
                    Out of Stock
                  </Label>
                </div>
              </div>
              <div className=" hidden lg:block lg:col-span-1">
                <div className="lg:border h-full w-[1px] bg-gray-200 mx-auto"></div>
              </div>

              <div className=" lg:col-span-4 space-y-3">
                <div>
                  <ImageUpload
                    endpoint="imageUploader"
                    value={imgUrl}
                    onChange={(url) => setImgUrl(url)}
                  />
                </div>
                <div className=" space-y-2">
                  <Label htmlFor="name">Brand</Label>
                  <BrandSelector
                    name="brandId"
                    control={control}
                    options={brands}
                  />
                </div>
                <div className=" space-y-2">
                  <Label htmlFor="name">Category</Label>
                  <CategorySelector
                    name="categoryId"
                    control={control}
                    options={categories}
                  />
                </div>
                <div className=" space-y-2 space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    {...register("published")}
                  />
                  <Label
                    htmlFor="published"
                    className=" font-semibold cursor-pointer"
                  >
                    Show Publish
                  </Label>
                </div>
              </div>
              <div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingUiBtn /> : "Save"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
