"use client";
import { updateVariant } from "@/actions/variant/variant.action";
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
import { SquarePen } from "lucide-react";
import VariantSelector from "./VariantSelector";
import { popularColors, popularSizes } from "@/constant/colors";

export default function EditVariantFormBtn({
  variant,
  reFresh,
}: {
  variant: Variant;
  reFresh: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset, control } = useForm<Variant>({
    defaultValues: {
      color: variant.color,
      size: variant.size,
      price: variant.price,
      stock: variant.stock,
    },
  });
  const editVariantForm = async (data: Variant) => {
    setLoading(true);
    try {
      const response = await updateVariant({
        ...data,
        id: variant.id,
        productId: variant.productId,
      });

      if (response.success) {
        toast.success("Variant updated Successfully");
        setIsOpen(false);
        reFresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <SquarePen className=" size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <form
            action=""
            className=" space-y-3"
            onSubmit={handleSubmit(editVariantForm)}
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
