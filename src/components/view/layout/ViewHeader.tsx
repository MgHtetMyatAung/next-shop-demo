import Link from "next/link";
import React from "react";
import ViewMobileMenu from "./ViewMobileMenu";
import { navItems } from "./data";
import { getSetting } from "@/actions/setting/setting.action";

export default async function ViewHeader() {
  const setting = await getSetting();
  return (
    <header className=" shadow">
      <nav className=" container flex justify-between items-center h-[60px]">
        <div>
          <Link href="/view" className=" text-xl font-semibold">
            {setting?.storeName || "Store Name"}
          </Link>
        </div>
        <ul className="items-center gap-5 hidden md:flex">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className=" md:hidden">
          <ViewMobileMenu />
        </div>
      </nav>
    </header>
  );
}
