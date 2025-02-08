import AlertBox from "@/components/view/home/AlertBox";
import ViewFooter from "@/components/view/layout/ViewFooter";
import ViewHeader from "@/components/view/layout/ViewHeader";
import React from "react";

export default function ViewRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ViewHeader />
      {children}
      <AlertBox />
      <ViewFooter />
    </main>
  );
}
