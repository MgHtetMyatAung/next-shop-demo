"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, []);
  return <>{isAuthenticated ? children : null}</>;
}
