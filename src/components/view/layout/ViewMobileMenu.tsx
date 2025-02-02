"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "./data";
import Link from "next/link";
import { AlignJustify } from "lucide-react";

export default function ViewMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className=" size-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" text-start">Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ul className=" space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
