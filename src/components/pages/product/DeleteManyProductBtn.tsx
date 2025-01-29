"use client";
import { deleteManyProductById } from "@/actions/product/product.action";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteManyProductBtn({
  ids,
  reFresh,
  disabled,
}: {
  ids: number[];
  reFresh: () => void;
  disabled: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteManyProductById(ids);
      if (response.success) {
        reFresh();
        toast.success("Product deleted Successfully");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          className=" flex items-center gap-2 disabled:opacity-60"
          disabled={disabled}
        >
          <Trash2 className=" size-5 text-red-500" />
          <label htmlFor="" className=" cursor-pointer">
            Delete Selected
          </label>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-red-500">
            Are you sure to delete selected Products?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {loading ? <LoadingUiBtn /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
