import { getSetting } from "@/actions/setting/setting.action";
import BreadCrumb from "@/components/common/BreadCrumb";
import SettingForm from "@/components/pages/setting/SettingForm";
import React from "react";

export default async function SettingPage() {
  const setting = await getSetting();
  return (
    <div>
      <BreadCrumb title="Setting" />
      <SettingForm setting={setting!} />
    </div>
  );
}
