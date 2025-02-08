import { getAlert } from "@/actions/alert/alert.action";
import React from "react";
import NewTricker from "./NewTricker";

export const revalidate = 3600;

export default async function AlertBox() {
  const { alert } = await getAlert();
  if (!alert) return null;
  if (!alert.isActive) return null;
  return <NewTricker alert={alert!} />;
}
