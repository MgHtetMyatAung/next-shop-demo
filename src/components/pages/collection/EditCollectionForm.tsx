"use client";
import { updateCollection } from "@/actions/collection/collection.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAllProducts from "@/hooks/useAllProducts";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MultiProductSelector from "./MultiProductSelector";
import { Button } from "@/components/ui/button";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import { useRouter } from "next/navigation";

export default function EditCollectionForm({
  collection,
}: {
  collection: Collection;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState<
    { label: string; value: number }[]
  >([]);
  const { products, loading: isFetching, reFocus } = useAllProducts();
  const { register, control, handleSubmit, reset } = useForm<Collection>({
    defaultValues: {
      name: collection.name,
      description: collection.description,
    },
  });
  const handleCreateCollection = async (data: Collection) => {
    setLoading(true);
    if (productIds.length === 0) {
      toast.error("Please select at least one product");
      setLoading(false);
      return;
    }
    try {
      const ids = productIds.map((product) => product.value);
      //   console.log(ids, "ids");
      const response = await updateCollection({
        ...data,
        productIds: ids,
        id: collection.id,
      });
      if (response.success) {
        toast.success("Collection updated successfully");
        router.push("/collection");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (selectedProducts: any) => {
    setProductIds(selectedProducts);
  };

  useEffect(() => {
    if (collection.products.length > 0) {
      const products = collection.products.map((product) => ({
        label: product.name,
        value: product.id,
      }));
      setProductIds(products);
    }
  }, [collection]);

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateCollection)}
        className=" space-y-3"
      >
        <div className=" space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Collection Name"
            {...register("name")}
            required
          />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            rows={2}
            {...register("description")}
          ></Textarea>
        </div>
        <div>
          {collection.products.length > 0 && (
            <MultiProductSelector
              selectedProducts={productIds}
              handleChange={handleChange}
              products={[
                ...products,
                ...collection.products.map((product) => ({
                  value: product.id,
                  label: product.name,
                })),
              ]}
              loading={isFetching}
            />
          )}
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? <LoadingUiBtn /> : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
