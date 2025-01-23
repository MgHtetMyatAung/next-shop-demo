import BreadCrumb from "@/components/common/BreadCrumb";
import ProductListTable from "@/components/pages/product/ProductListTable";

export default function ProductPage() {
  return (
    <div>
      <BreadCrumb title="Products" />
      <ProductListTable />
    </div>
  );
}
