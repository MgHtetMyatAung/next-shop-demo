import BreadCrumb from "@/components/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getMainCategories,
  getSubCategories,
} from "@/actions/category/category.action";
import DeleteCategoryBtn from "@/components/pages/category/DeleteCategoryBtn";
import { SquarePen } from "lucide-react";

export default async function CategoryPage() {
  const mainData = await getMainCategories();
  const subData = await getSubCategories();
  return (
    <div>
      <BreadCrumb title="Category" />
      <div className="">
        <Link href={"/category/create"} className=" block w-fit ms-auto">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className=" my-5">
        <Tabs defaultValue="main" className="w-full">
          <TabsList>
            <TabsTrigger value="main">Main Category</TabsTrigger>
            <TabsTrigger value="sub">SubCategory</TabsTrigger>
          </TabsList>
          <TabsContent value="main">
            <Table className="w-full overflow-hidden">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-gray-900 font-semibold uppercase">
                    No
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Name
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Slug
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Sub Category
                  </TableHead>
                  <TableHead className="text-right text-gray-900 font-semibold uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              {mainData.categories && (
                <TableBody>
                  {mainData.categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>
                        {category.subcategories.length > 0 ? (
                          <>
                            {category.subcategories.map(
                              (subcategory, index) => (
                                <p
                                  key={subcategory.id}
                                  className=" border rounded w-fit p-1"
                                >
                                  {subcategory.name}
                                </p>
                              )
                            )}
                          </>
                        ) : (
                          <p className=" text-gray-400">no sub category</p>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-3">
                        <button>
                          <Link
                            className=" block w-fit"
                            href={`/category/edit?id=${category.id}`}
                          >
                            <SquarePen className=" size-5" />
                          </Link>
                        </button>
                        <DeleteCategoryBtn id={category.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TabsContent>
          <TabsContent value="sub">
            <Table className="w-full overflow-hidden">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-gray-900 font-semibold uppercase">
                    No
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Name
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Slug
                  </TableHead>
                  <TableHead className=" text-gray-900 font-semibold uppercase">
                    Relation
                  </TableHead>
                  <TableHead className="text-right text-gray-900 font-semibold uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              {subData.categories && (
                <TableBody>
                  {subData.categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>{category.parent?.name}</TableCell>
                      <TableCell className="text-right space-x-3">
                        <button>
                          <Link href={`/category/edit?id=${category.id}`}>
                            <SquarePen className=" size-5" />
                          </Link>
                        </button>
                        <DeleteCategoryBtn id={category.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
