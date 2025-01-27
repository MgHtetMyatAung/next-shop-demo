import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className=" space-y-4">
      <Skeleton className="w-full h-[300px] rounded" />
      <Skeleton className="w-full h-[30px] rounded" />
    </div>
  );
}
