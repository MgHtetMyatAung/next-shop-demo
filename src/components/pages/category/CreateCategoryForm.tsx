"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CategorySelector from "./CategorySelector";
import { Button } from "@/components/ui/button";
import {
  createCategory,
  getTopCategory,
} from "@/actions/category/category.action";
import toast from "react-hot-toast";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";

export default function CreateCategoryForm() {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryType>({});
  const onSubmit = async (data: CategoryType) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await createCategory(data);
      if (response.success) {
        toast.success("Category created successfully");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  console.log(errors);
  useEffect(() => {
    const getData = async () => {
      const data = await getTopCategory();
      if (data.success && data.categories) {
        setCategories(data.categories);
        console.log(data.categories);
      }
    };

    getData();
  }, [loading]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10">
          <div className=" lg:col-span-6 space-y-3">
            <div className=" space-y-1">
              <Label htmlFor="name">Category Name</Label>
              <Input
                type="text"
                placeholder="Category Name"
                {...register("name")}
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("description")}
                rows={3}
              />
            </div>
          </div>
          <div className=" hidden lg:block lg:col-span-1">
            <div className="lg:border h-full w-[1px] bg-gray-200 mx-auto"></div>
          </div>
          <div className=" lg:col-span-5 space-y-3">
            <div className=" space-y-1">
              <Label htmlFor="name">Slug</Label>
              <Input type="text" placeholder="Slug" {...register("slug")} />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="name">Parent Category</Label>
              <CategorySelector
                control={control}
                name="parentId"
                options={categories}
              />
            </div>
          </div>
          <div>
            <Button type="submit">
              {loading ? <LoadingUiBtn /> : " Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
