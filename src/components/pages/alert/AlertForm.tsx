"use client";
import { createAlert, updateAlert } from "@/actions/alert/alert.action";
import ImageUpload from "@/components/common/ImageUpload";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AlertForm({ alert }: { alert: Alert }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>(alert.imageUrl || "");
  const { register, handleSubmit } = useForm<Alert>({
    defaultValues: {
      title: alert?.title,
      message: alert?.message,
      isActive: alert?.isActive,
      linkUrl: alert?.linkUrl,
    },
  });
  const handleForm = async (data: Alert) => {
    setIsLoading(true);
    try {
      if (alert?.id) {
        const response = await updateAlert({
          ...data,
          id: alert.id,
          imageUrl: imgUrl,
        });
        if (response.success) {
          toast.success("Successfully Saved Alert!");
        }
      } else {
        const response = await createAlert({ ...data, imageUrl: imgUrl });
        if (response.success) {
          toast.success("Successfully Saved Alert!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" py-5">
      <form
        action=""
        onSubmit={handleSubmit(handleForm)}
        className=" space-y-3 max-w-[600px]"
      >
        <div className=" space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Alert title"
            {...register("title")}
          />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="message"
            {...register("message")}
          ></Textarea>
        </div>
        <div className=" space-y-2">
          <Label htmlFor="link">Link Url</Label>
          <Input
            type="text"
            id="link"
            placeholder="Alert link"
            {...register("linkUrl")}
          />
        </div>
        <div>
          <ImageUpload
            endpoint="imageUploader"
            onChange={(url) => setImgUrl(url)}
            value={imgUrl}
          />
        </div>
        <div className=" flex items-center gap-3">
          <input type="checkbox" id="isActive" {...register("isActive")} />
          <Label htmlFor="isActive" className=" font-semibold">
            Is Active
          </Label>
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingUiBtn /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
