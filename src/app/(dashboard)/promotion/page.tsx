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
import { getAllPromotions } from "@/actions/promotion/promotion.action";
import { Badge } from "@/components/ui/badge";
import { SquarePen } from "lucide-react";
import DeletePromotionBtn from "@/components/pages/promotion/DeletePromotionBtn";

export default async function PromotionPage() {
  const data = await getAllPromotions();
  return (
    <div>
      <BreadCrumb title="Promotion" />
      <div className="">
        <Link href={"/promotion/create"} className=" block w-fit ms-auto">
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
              {/* <TableHead className="text-gray-900 font-semibold uppercase">
                Description
              </TableHead> */}
              <TableHead className="text-gray-900 font-semibold uppercase">
                Type
              </TableHead>
              <TableHead className="text-gray-900 font-semibold uppercase">
                Amount
              </TableHead>
              <TableHead className="lg:w-[350px] text-gray-900 font-semibold uppercase">
                Products
              </TableHead>
              <TableHead className="text-right text-gray-900 font-semibold uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {data.promotions && (
            <TableBody>
              {data.promotions.map((promotion, index) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{promotion.title}</TableCell>
                  {/* <TableCell>{promotion.description}</TableCell> */}
                  <TableCell>{promotion.type}</TableCell>
                  <TableCell>
                    {promotion.type === "DISCOUNT" ? (
                      <span>{promotion.discount} %</span>
                    ) : promotion.type === "CASHBACK" ? (
                      <span>{promotion.cashback} MMK</span>
                    ) : null}
                  </TableCell>
                  <TableCell className=" flex flex-wrap gap-2">
                    {promotion.products.map((product) => (
                      <Badge key={product.id}>{product.name}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <button>
                      <Link
                        className=" block w-fit"
                        href={`/promotion/edit?id=${promotion.id}`}
                      >
                        <SquarePen className=" size-5" />
                      </Link>
                    </button>
                    <DeletePromotionBtn id={promotion.id} />
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
