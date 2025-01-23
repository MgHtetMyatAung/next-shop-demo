"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/AppSideBar";
import DashboardMenu from "./menu/DashboardMenu";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main className=" w-full relative scroll-bar-fit">
        <DashboardMenu />
        <div className=" p-5 bg-secondary-gray w-full h-full">
          <div className="">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
