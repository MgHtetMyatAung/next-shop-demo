import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminAuthProvider from "@/provider/AdminAuthProvider";
import React from "react";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminAuthProvider>
        <DashboardLayout>
          <main>{children}</main>
        </DashboardLayout>
      </AdminAuthProvider>
    </>
  );
}
