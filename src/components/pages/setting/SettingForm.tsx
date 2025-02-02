"use client";
import { createSetting, updateSetting } from "@/actions/setting/setting.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import VariantSelector from "../variant/VariantSelector";
import { Button } from "@/components/ui/button";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";

const languageOptions = [
  { key: "English", value: "ENGLISH" },
  { key: "MYANMAR", value: "MYANMAR" },
];

export default function SettingForm({ setting }: { setting: Setting }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit } = useForm<Setting>({
    defaultValues: {
      storeName: setting?.storeName,
      defaultLanguage: setting?.defaultLanguage,
      allowOutOfStockPurchase: setting?.allowOutOfStockPurchase,
      autoPublish: setting?.autoPublish,
    },
  });
  const handleForm = async (data: Setting) => {
    console.log(data);
    setIsLoading(true);
    try {
      if (setting?.id) {
        console.log("first");
        const response = await updateSetting({
          ...data,
          id: setting.id,
        });
        if (response.success) {
          toast.success("Successfully Saved !");
        }
      } else {
        console.log("second");
        const response = await createSetting(data);
        if (response.success) {
          toast.success("Successfully Saved !");
        }
      }
    } catch (error) {
      toast.error("Something went wrong !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-5">
      <form
        action=""
        className=" space-y-3"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className=" space-y-2">
          <Label htmlFor="store_name">Store Name</Label>
          <Input
            type="text"
            placeholder="Enter your store name"
            id="store_name"
            {...register("storeName")}
          />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="default_language">Default Language</Label>
          <VariantSelector
            name="defaultLanguage"
            control={control}
            options={languageOptions}
          />
        </div>
        <div className=" space-y-2 flex gap-2 items-end">
          <input
            type="checkbox"
            id="allow_out_of_stock_purchase"
            {...register("allowOutOfStockPurchase")}
          />
          <Label htmlFor="allow_out_of_stock_purchase">
            Allow out of stock Purchase
          </Label>
        </div>
        <div className=" space-y-2 flex gap-2 items-end">
          <input
            type="checkbox"
            id="auto_publish"
            {...register("autoPublish")}
          />
          <Label htmlFor="auto_publish">Auto Publish</Label>
        </div>
        <div>
          <Button type="submit">{isLoading ? <LoadingUiBtn /> : "Save"}</Button>
        </div>
      </form>
    </div>
  );
}
