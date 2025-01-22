"use client";
import { editBrand } from "@/actions/brand/brand.action";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BrandCreateFormType = {
  id: number;
  name: string;
  description: string | null;
};

export default function EditForm({
  id,
  name,
  description,
}: BrandCreateFormType) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm<BrandCreateFormType>({
    defaultValues: {
      name: name,
      description: description,
    },
  });
  const createBrandForm = async (data: BrandCreateFormType) => {
    setLoading(true);
    try {
      const response = await editBrand({
        id: id,
        name: data.name,
        description: data.description,
      });

      if (response.success) {
        toast.success("Brand Update Successfully");
        setIsOpen(false);
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
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
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
            <Button>{loading ? <LoadingUiBtn /> : "Update"}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
