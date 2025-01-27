"use client";
import useProductVariants from "@/hooks/useProductVariants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VariantCreateFormBtn from "../variant/VariantCreateFormBtn";
import DeleteVariantBtn from "../variant/DeleteVariantBtn";
import EditVariantFormBtn from "../variant/EditVariantFormBtn";

export default function AddVariantForm({ productId }: { productId: number }) {
  const {
    loading,
    reFocus,
    data: productVariants,
  } = useProductVariants({ productId });

  return (
    <div>
      <VariantCreateFormBtn productId={productId} reFresh={reFocus} />
      <div className=" py-5">
        {!loading && (
          <Table className="w-full overflow-hidden">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-gray-900 font-semibold uppercase">
                  No
                </TableHead>
                <TableHead className="text-gray-900 font-semibold uppercase">
                  Color
                </TableHead>
                <TableHead className="text-gray-900 font-semibold uppercase">
                  Size
                </TableHead>
                <TableHead className="text-gray-900 font-semibold uppercase">
                  Stock
                </TableHead>
                <TableHead className="text-gray-900 font-semibold uppercase">
                  Price
                </TableHead>
                <TableHead className="text-right text-gray-900 font-semibold uppercase">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            {productVariants && (
              <TableBody>
                {productVariants.map((variant, index) => (
                  <TableRow key={variant.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{variant.color}</TableCell>
                    <TableCell>{variant.size}</TableCell>
                    <TableCell>{variant.stock}</TableCell>
                    <TableCell>{variant.price} MMK</TableCell>
                    <TableCell className="text-right space-x-2">
                      <EditVariantFormBtn reFresh={reFocus} variant={variant} />
                      <DeleteVariantBtn id={variant.id!} reFresh={reFocus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </div>
    </div>
  );
}
