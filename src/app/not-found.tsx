import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" space-y-3">
        <h3 className=" text-xl lg:text-3xl font-semibold text-gray-600">
          404
        </h3>
        <div className="text-center">
          <Link href={"/"} className=" underline ">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
