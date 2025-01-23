import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  const fakeData = Array.from({ length: 8 }, (_, index) => index + 1);
  return (
    <div className=" space-y-2">
      {fakeData.map((item, index) => (
        <Skeleton key={index} className="w-full h-[35px] rounded" />
      ))}
    </div>
  );
}
