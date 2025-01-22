import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardLayout>
        <main>{children}</main>
        <Toaster />
      </DashboardLayout>
    </>
  );
}
