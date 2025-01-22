import { getBrands } from "@/actions/brand/brand.action";
import BreadCrumb from "@/components/common/BreadCrumb";
import DeleteBrandBtn from "@/components/pages/brand/DeleteBrandBtn";
import EditForm from "@/components/pages/brand/EditForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

import React from "react";

export default async function BrandPage() {
  const data = await getBrands();
  return (
    <div>
      <BreadCrumb title="Brand" />
      <div className="">
        <Link href={"/brand/create"} className=" block w-fit ms-auto">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className=" my-5">
        <Table className="w-full overflow-hidden">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-gray-900 font-semibold uppercase">
                No
              </TableHead>
              <TableHead className="text-gray-900 font-semibold uppercase">
                Name
              </TableHead>
              <TableHead className="text-gray-900 font-semibold uppercase">
                Description
              </TableHead>
              <TableHead className="text-right text-gray-900 font-semibold uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {data.brands && (
            <TableBody>
              {data.brands.map((brand, index) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <EditForm {...brand} /> <DeleteBrandBtn id={brand.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
