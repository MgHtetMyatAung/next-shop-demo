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
  Logs,
  Pen,
  SquarePen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/useProducts";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import DeleteProductBtn from "@/components/pages/product/DeleteProductBtn";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteManyProductBtn from "./DeleteManyProductBtn";

export default function ProductListTable() {
  const [currentPage, handlePageChange] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showCheckbox, setShowCheckbox] = useState(false);

  const { products, totalPages, loading, reFocus } = useProducts({
    page: currentPage,
    limit: 8,
  });
  const [search, setSearch] = useState("");
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      if (products) setSelectedProducts(products.map((product) => product.id!));
    }
  };
  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  const handleShowCheckbox = () => {
    if (showCheckbox) {
      setShowCheckbox(false);
      setSelectedProducts([]);
    } else {
      setShowCheckbox(true);
    }
  };
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
        <div className=" flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className=" border rounded-md p-2">
                <Logs className=" size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className=" max-w-[200px] space-y-2">
              <div className=" flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={showCheckbox}
                  onCheckedChange={() => handleShowCheckbox()}
                  id="show-checkbox"
                />
                <label htmlFor="show-checkbox" className=" cursor-pointer">
                  Show Checkbox
                </label>
              </div>
              <div className=" cursor-pointer">
                <DeleteManyProductBtn
                  ids={selectedProducts}
                  reFresh={reFocus}
                  disabled={selectedProducts.length === 0}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Link href={"/product/create"} className="">
            <Button>Add New</Button>
          </Link>
        </div>
      </div>
      <div className=" my-3">
        {!loading ? (
          <>
            <Table className="w-full overflow-hidden">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  {showCheckbox && (
                    <TableHead className="w-[50px] text-gray-900 font-semibold uppercase">
                      <Checkbox
                        checked={selectedProducts.length === products.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {/* <TableHead className="w-[50px] text-gray-900 font-semibold uppercase">
                    No
                  </TableHead> */}
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
                        {showCheckbox && (
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id!)}
                              onCheckedChange={() =>
                                handleSelectProduct(product.id!)
                              }
                            />
                          </TableCell>
                        )}
                        {/* <TableCell className="font-medium">
                          {index + 1}
                        </TableCell> */}
                        <TableCell>
                          <div className=" flex items-center gap-2">
                            <Image
                              src={product?.image || "/img/default.png"}
                              alt="product"
                              width={50}
                              height={55}
                              className=" border"
                            />
                            <p>{product.name}</p>
                          </div>
                        </TableCell>
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
                        <TableCell className="">
                          <div className="flex justify-end items-center space-x-3">
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
                          </div>
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
