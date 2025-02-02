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
import { getAllCollections } from "@/actions/collection/collection.action";
import { Badge } from "@/components/ui/badge";
import DeleteCollectionBtn from "@/components/pages/collection/DeleteCollectionBtn";
import { SquarePen } from "lucide-react";

export default async function CollectionPage() {
  const data = await getAllCollections();
  return (
    <div>
      <BreadCrumb title="Collection" />
      <div className="">
        <Link href={"/collection/create"} className=" block w-fit ms-auto">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className=" mt-3">
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
              <TableHead className="lg:w-[350px] text-gray-900 font-semibold uppercase">
                Products
              </TableHead>
              <TableHead className="text-right text-gray-900 font-semibold uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {data.collections && (
            <TableBody>
              {data.collections.map((collection, index) => (
                <TableRow key={collection.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell>{collection.description}</TableCell>
                  <TableCell className=" flex flex-wrap gap-2">
                    {collection.products.map((product) => (
                      <Badge key={product.id}>{product.name}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* <EditForm {...brand} /> <DeleteBrandBtn id={brand.id} /> */}
                    <button>
                      <Link
                        className=" block w-fit"
                        href={`/collection/edit?id=${collection.id}`}
                      >
                        <SquarePen className=" size-5" />
                      </Link>
                    </button>
                    <DeleteCollectionBtn id={collection.id} />
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
