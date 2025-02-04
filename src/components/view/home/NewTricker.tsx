"use client";
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
import { useAlertStore } from "@/hooks/useAlertStore";
import { Megaphone, X } from "lucide-react";

export default function NewTricker() {
  const { isOpen, toggleAlert } = useAlertStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={toggleAlert}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent className=" w-[90%] sm:w-auto rounded-md bg-[#100d46]">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-yellow-300 text-center flex gap-3 justify-center">
            <Megaphone />
            Noti for customer !
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-white leading-7">
            Online မှ မှာယူသော customer များအတွက် ယုံကြည်စိတ်ချရသော Delivery
            services များနှင့် အိမ်အရောက် ပို့ဆောင်ပေးပါသည်။
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          {/* <AlertDialogCancel>Close</AlertDialogCancel> */}
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <button
            onClick={toggleAlert}
            className=" absolute -top-2 -right-2 size-7 bg-white rounded-full"
          >
            <X className=" size-5 mx-auto" />
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
