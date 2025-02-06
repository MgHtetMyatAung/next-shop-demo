import { getAlert } from "@/actions/alert/alert.action";
import BreadCrumb from "@/components/common/BreadCrumb";
import AlertForm from "@/components/pages/alert/AlertForm";
import React from "react";

export default async function AlertPage() {
  const { alert } = await getAlert();
  return (
    <div>
      <BreadCrumb title="Alert" />
      <AlertForm alert={alert!} />
    </div>
  );
}
