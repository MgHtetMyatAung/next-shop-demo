"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ComingSoon() {
  return (
    <div className=" w-full h-[50vh] grid place-items-center">
      <div className=" text-center text-gray-800 space-y-3">
        <h3 className=" text-xl lg:text-3xl font-semibold text-gray-600 ">
          Coming Soon
        </h3>
        <div className=" flex gap-3 border-2 p-2 rounded-full justify-center">
          <div className=" flex items-center gap-1">
            <span className=" font-semibold">{25}</span>{" "}
            <span className="block text-sm">Days Left</span>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-3">
          <p>Under Construction</p>
          <Image src={"/logo/tools.png"} alt="tools" width={15} height={15} />
        </div>
      </div>
    </div>
  );
}
