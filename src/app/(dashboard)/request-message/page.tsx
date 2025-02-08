import { getRequestMessage } from "@/actions/request/request.action";
import BreadCrumb from "@/components/common/BreadCrumb";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import React from "react";

export default async function RequestMessagePage() {
  const { success, request } = await getRequestMessage();
  if (!success) return <div>Error</div>;
  if (!request) return <div>No Request</div>;
  return (
    <div>
      <BreadCrumb title="Request Message" />
      <div className=" space-y-5 py-5">
        {request.map((req, idx) => (
          <div key={idx} className=" p-5 rounded-md shadow border">
            <h3 className=" text-blue-600 font-medium">
              {req.name}{" "}
              <span className=" text-gray-400 font-normal">({req.email})</span>
            </h3>
            <p className=" my-1">- {req.message}</p>
            <p className=" flex items-center text-sm text-gray-400 gap-2">
              <Clock className=" size-4" /> {formatDistanceToNow(req.createdAt)}{" "}
              ago
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
