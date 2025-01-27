"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BadgeCheck,
  BadgeX,
  ChevronLeft,
  ChevronRight,
  Pen,
  SquarePen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/useProducts";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import DeleteProductBtn from "@/components/pages/product/DeleteProductBtn";

export default function ProductListTable() {
  const [currentPage, handlePageChange] = useState(1);
  const { products, totalPages, loading, reFocus } = useProducts({
    page: currentPage,
    limit: 8,
  });
  const [search, setSearch] = useState("");
  return (
    <>
      <div className=" flex items-center justify-between mt-5">
        <div>
          <Input
            type="text"
            placeholder="Search product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link href={"/product/create"} className="">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className=" my-3">
        {!loading ? (
          <>
            <Table className="w-full overflow-hidden">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-gray-900 font-semibold uppercase">
                    No
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold uppercase">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold uppercase">
                    Description
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold uppercase">
                    Publish
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold uppercase">
                    Stock
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold uppercase">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-gray-900 font-semibold uppercase">
                    Price
                  </TableHead>
                  <TableHead className="text-right text-gray-900 font-semibold uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              {products && (
                <TableBody>
                  {products
                    .filter((item) => item.name.toLowerCase().includes(search))
                    .map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          {product.published ? (
                            <BadgeCheck className=" size-4 text-green-600" />
                          ) : (
                            <BadgeX className=" size-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell
                          className={`${
                            product.out_of_stock === false
                              ? " text-green-600"
                              : " text-red-500"
                          }`}
                        >
                          {product.out_of_stock ? "Out of Stock" : "In Stock"}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.price} MMK
                        </TableCell>
                        <TableCell className=" flex justify-end items-center space-x-3">
                          <button>
                            <Link
                              href={`/product/${product.id}`}
                              className=" underline"
                            >
                              View
                            </Link>
                          </button>
                          <button>
                            <Link href={`/product/edit?id=${product.id}`}>
                              <SquarePen className=" size-5" />
                            </Link>
                          </button>
                          <DeleteProductBtn
                            reFresh={reFocus}
                            id={product.id!}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
            {totalPages > 1 && (
              <div className=" flex items-center gap-3 w-fit mx-auto mt-5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className=" bg-gray-800 disabled:opacity-60 text-white px-3 py-2 rounded-md"
                >
                  <ChevronLeft className=" size-4" />
                </button>
                <p className=" w-[100px] text-center">
                  Page {currentPage} of {totalPages}{" "}
                </p>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className=" bg-gray-800 disabled:opacity-60 text-white px-3 py-2 rounded-md"
                >
                  <ChevronRight className=" size-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <TableSkeleton />
        )}
      </div>
    </>
  );
}
