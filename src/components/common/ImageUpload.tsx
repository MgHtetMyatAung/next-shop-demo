"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "imageUploader";
}

export default function ImageUpload({
  onChange,
  value,
  endpoint,
}: ImageUploadProps) {
  if (value) {
    return (
      <div className=" relative w-[200px] h-auto ">
        <Image
          src={value}
          alt="productImage"
          width={200}
          height={200}
          className=" rounded-md w-full h-auto"
        />
        <button
          type="button"
          className=" bg-red-500 absolute top-0 right-0 rounded-full p-1"
          onClick={() => onChange("")}
        >
          <XIcon className=" size-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => console.log(error)}
    />
  );
}
