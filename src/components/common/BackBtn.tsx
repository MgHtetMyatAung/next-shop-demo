"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackBtn() {
  const router = useRouter();
  return (
    <div>
      <Button variant={"link"} onClick={() => router.back()}>
        <ChevronLeft />
        Back
      </Button>
    </div>
  );
}
