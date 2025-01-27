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
import { updateProduct } from "@/actions/product/product.action";
import toast from "react-hot-toast";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import FormSkeleton from "@/components/skeleton/FormSkeleton";
import { useRouter } from "next/navigation";
import AddVariantForm from "./AddVariantForm";

export default function EditProductForm({ product }: { product: ProductType }) {
  const router = useRouter();
  const { loading: categoryLoading, categories } = useCategories();
  const { brands, loading: brandLoading } = useBrands();
  const [productId, setProductId] = useState<null | number>(null);
  const { register, handleSubmit, control, reset } = useForm<ProductType>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product?.categoryId,
      brandId: product?.brandId,
      published: product.published,
      out_of_stock: product.out_of_stock,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const uiLoading = categoryLoading || brandLoading;

  const onSubmit = async (data: ProductType) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await updateProduct({
        id: product.id,
        ...data,
      });
      if (response.success) {
        toast.success("Product updated Successfully !");
        setProductId(product.id!);
      }
    } catch (error) {
      toast.error("Something wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" p-3 space-y-3">
        <div>
          {productId ? (
            <h3 className=" text-lg sm:text-xl font-medium">Edit Variant</h3>
          ) : (
            <h3 className=" text-lg sm:text-2xl font-medium">Edit Product</h3>
          )}
        </div>
        <div>
          {uiLoading ? (
            <FormSkeleton />
          ) : (
            <>
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
                    <div className=" flex items-center gap-3">
                      <Button type="submit">
                        {isLoading ? <LoadingUiBtn /> : "Update"}
                      </Button>
                      <Button
                        variant={"link"}
                        onClick={() => setProductId(product.id!)}
                      >
                        Edit Variant
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
