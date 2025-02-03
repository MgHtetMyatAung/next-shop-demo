"use client";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadCrumb({
  title,
  links,
  homeRoute = "/",
}: {
  title: string;
  links?: { name: string; link: string }[];
  homeRoute?: string;
}) {
  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={homeRoute}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem> */}
        {links &&
          links.map((item) => (
            <Fragment key={item.name}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link || "#"}>
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
