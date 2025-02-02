"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "./DatePicker";
import PromotionTypeSelector from "./PromotionTypeSelector";
import { Button } from "@/components/ui/button";
import useAllProductByPromotion from "@/hooks/useAllProductByPromotion";
import MultiProductSelector from "../collection/MultiProductSelector";
import { createPromotion } from "@/actions/promotion/promotion.action";
import toast from "react-hot-toast";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";

const options = [
  { value: "DISCOUNT", label: "Discount" },
  { value: "CASHBACK", label: "Cashback" },
  { value: "BUY1GET1", label: "Buy 1 Get 1" },
];

export default function CreatePromotionForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [selectedPromotion, setSelectedPromotion] = React.useState<any>();
  const [productIds, setProductIds] = useState<
    { lable: string; value: number }[]
  >([]);

  const { loading, products, reFocus } = useAllProductByPromotion();

  const { register, handleSubmit, reset } = useForm<Promotion>({});
  const handleForm = async (data: Promotion) => {
    if (
      !startDate ||
      !endDate ||
      !selectedPromotion ||
      productIds.length === 0
    ) {
      toast.error("Please fill require fields");
      return;
    }
    setIsSubmit(true);
    try {
      const response = await createPromotion({
        ...data,
        startDate: startDate,
        endDate: endDate,
        type: selectedPromotion?.value,
        productIds: productIds.map((product) => product.value),
      });
      if (response.success) {
        toast.success("Promotion created successfully");
        reset();
        reFocus();
        setStartDate(undefined);
        setEndDate(undefined);
        setSelectedPromotion(undefined);
        setProductIds([]);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmit(false);
    }
  };
  const handleChange = (selectedProducts: any) => {
    setProductIds(selectedProducts);
  };
  console.log(selectedPromotion);
  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(handleForm)}
        className=" space-y-3"
      >
        <div className="grid lg:grid-cols-2 gap-10">
          <div className=" space-y-3">
            <div className=" space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Promotion Title"
                {...register("title")}
                required
              />
            </div>
            <div className=" space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={2}
                placeholder="Description"
                {...register("description")}
              />
            </div>
            <div>
              <MultiProductSelector
                products={products}
                selectedProducts={productIds}
                handleChange={handleChange}
                loading={loading}
              />
            </div>
          </div>
          <div className=" space-y-3">
            <div className=" grid lg:grid-cols-2 gap-5">
              <div>
                <PromotionTypeSelector
                  selectedPromotion={selectedPromotion}
                  handleChange={setSelectedPromotion}
                  options={options}
                />
              </div>
              <div>
                {selectedPromotion?.value === "DISCOUNT" ? (
                  <div className=" space-y-2">
                    <Label htmlFor="discount">Discount Percent</Label>
                    <Input
                      id="discount"
                      type="number"
                      placeholder="Discount"
                      {...register("discount")}
                      required
                    />
                  </div>
                ) : selectedPromotion?.value === "CASHBACK" ? (
                  <div className=" space-y-2">
                    <Label htmlFor="cashback">Cashback</Label>
                    <Input
                      id="cashback"
                      type="number"
                      placeholder="Cashback amount"
                      {...register("cashback")}
                      required
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className=" grid lg:grid-cols-2 gap-5">
              <div>
                <DatePicker
                  label="Start Date"
                  date={startDate!}
                  setDate={setStartDate}
                />
              </div>
              <div>
                <DatePicker
                  label="End Date"
                  date={endDate!}
                  setDate={setEndDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button type="submit" disabled={isSubmit}>
            {isSubmit ? <LoadingUiBtn /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
