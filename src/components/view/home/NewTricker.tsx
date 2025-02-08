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
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/hooks/useAlertStore";
import { Megaphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewTricker({ alert }: { alert: Alert }) {
  const { isOpen, toggleAlert } = useAlertStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={toggleAlert}>
      <AlertDialogTrigger className=" h-0"></AlertDialogTrigger>
      <AlertDialogContent
        className={`border-0 w-[90%] sm:w-[400px] rounded-md ${
          alert.imageUrl && "p-0"
        }`}
      >
        <AlertDialogHeader>
          {alert.imageUrl && (
            <div className="">
              <Image
                src={alert.imageUrl}
                width={500}
                height={200}
                alt="alert-img"
                className=" w-full h-auto rounded-t-md rounded-b-2xl mb-2"
              />
            </div>
          )}
          <AlertDialogTitle
            className={` text-gray-900 text-center flex gap-3 justify-center ${
              alert.imageUrl && "px-6"
            }`}
          >
            {/* <Megaphone /> */}
            {alert.title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`text-gray-900 leading-7  ${
              alert.imageUrl && "px-6 pb-3"
            }`}
          >
            {alert.message}
          </AlertDialogDescription>
          {alert.linkUrl && (
            <button
              className=" w-[90%] mx-auto underline text-blue-800"
              onClick={toggleAlert}
            >
              <Link href={alert.linkUrl || ""}>Get Now</Link>
            </button>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          {/* <AlertDialogCancel>Close</AlertDialogCancel> */}
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <button
            onClick={toggleAlert}
            className=" absolute -top-2 -right-2 size-7 bg-white rounded-full border-2 border-gray-800"
          >
            <X className=" size-5 mx-auto" />
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
