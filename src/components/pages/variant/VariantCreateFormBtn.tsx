"use client";
import { createVariant } from "@/actions/variant/variant.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import VariantSelector from "./VariantSelector";
import { popularColors, popularSizes } from "@/constant/colors";

export default function VariantCreateFormBtn({
  productId,
  reFresh,
}: {
  productId: number;
  reFresh?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset, control } = useForm<Variant>({});
  const createVariantForm = async (data: Variant) => {
    setLoading(true);
    try {
      const response = await createVariant({
        ...data,
        productId,
      });

      if (response.success) {
        toast.success("Variant Created Successfully");
        reset();
        setIsOpen(false);
        reFresh && reFresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=" block bg-gray-900 text-white rounded px-3 py-2 text-sm w-[100px] ms-auto">
        Add New
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Variant</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <form
            action=""
            className=" space-y-3"
            onSubmit={handleSubmit(createVariantForm)}
          >
            <VariantSelector
              control={control}
              name="color"
              options={popularColors}
            />
            <VariantSelector
              control={control}
              name="size"
              options={popularSizes}
            />
            <Input
              type="text"
              placeholder="Stock (eg. 100)"
              {...register("stock")}
              required
            />
            <Input
              type="text"
              placeholder="Price (eg. 1000)"
              {...register("price")}
              required
            />
            <Button disabled={loading}>
              {loading ? <LoadingUiBtn /> : "Save"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
