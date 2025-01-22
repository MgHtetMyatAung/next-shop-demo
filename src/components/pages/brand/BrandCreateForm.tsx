"use client";
import { createBrand } from "@/actions/brand/brand.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";

type BrandCreateFormType = {
  name: string;
  description: string;
};

export default function BrandCreateForm() {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm<BrandCreateFormType>();
  const createBrandForm = async (data: BrandCreateFormType) => {
    setLoading(true);
    try {
      const response = await createBrand({
        name: data.name,
        description: data.description,
      });

      if (response.success) {
        toast.success("Brand Created Successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      action=""
      className=" space-y-3"
      onSubmit={handleSubmit(createBrandForm)}
    >
      <Input type="text" placeholder="Brand Name" {...register("name")} />
      <Input
        type="text"
        placeholder="Brand Description"
        {...register("description")}
      />
      <Button>{loading ? <LoadingUiBtn /> : "Create"}</Button>
    </form>
  );
}
