"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import MultiProductSelector from "./MultiProductSelector";
import { Button } from "@/components/ui/button";
import { createCollection } from "@/actions/collection/collection.action";
import toast from "react-hot-toast";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import useAllProducts from "@/hooks/useAllProducts";

export default function CreateCollectionForm() {
  const [loading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState<
    { lable: string; value: number }[]
  >([]);
  const { products, loading: isFetching, reFocus } = useAllProducts();
  const { register, control, handleSubmit, reset } = useForm<Collection>({});
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
      const response = await createCollection({ ...data, productIds: ids });
      if (response.success) {
        toast.success("Collection created successfully");
        reset();
        setProductIds([]);
        reFocus();
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
          <MultiProductSelector
            selectedProducts={productIds}
            handleChange={handleChange}
            products={products}
            loading={isFetching}
          />
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? <LoadingUiBtn /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
