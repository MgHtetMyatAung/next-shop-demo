"use client";
import { getColorHex } from "@/constant/colors";
import useProductVariants from "@/hooks/useProductVariants";
import React, { useEffect } from "react";

export default function VariantBox({
  productId,
  color,
  setColor,
  size,
  setSize,
}: {
  productId: number;
  color: string;
  setColor: (color: string) => void;
  size: string;
  setSize: (size: string) => void;
}) {
  const { data: productVariants, loading } = useProductVariants({
    productId,
  });
  const [colors, setColors] = React.useState<string[]>([]);
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [activeSizes, setActiveSizes] = React.useState<string[]>([]);

  useEffect(() => {
    if (productVariants) {
      const colors = Object.groupBy(productVariants, ({ color }) => color);
      const targetData: Variant[] | undefined = colors[color];
      const targetSizes =
        targetData && Object.groupBy(targetData, ({ size }) => size);
      const sizes = Object.groupBy(productVariants, ({ size }) => size);
      setColors(Object.keys(colors));
      setSizes(Object.keys(sizes));
      if (targetSizes) {
        setActiveSizes(Object.keys(targetSizes));
      }
    }
  }, [productVariants, color]);
  return (
    <div>
      <div>
        {colors.length > 0 && (
          <>
            <p>Color</p>
            <div className=" py-2 space-x-3">
              {colors.map((clr) => (
                <button
                  key={clr}
                  className={` size-8 rounded-full border-4 ${
                    clr === color ? " border-blue-600" : ""
                  } `}
                  style={{ backgroundColor: getColorHex(clr) }}
                  onClick={() => {
                    setColor(clr);
                    setSize("");
                  }}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        {sizes.length > 0 && (
          <>
            <p>Size</p>
            <div className=" py-2 space-x-3">
              {sizes.map((siz) => (
                <button
                  key={siz}
                  className={` min-w-[32px] px-2 h-[32px] rounded-full uppercase border-2 font-medium ${
                    activeSizes.includes(siz)
                      ? `text-gray-900 ${
                          siz === size ? " border-blue-600" : " border-gray-200"
                        }`
                      : " text-gray-300"
                  } `}
                  disabled={
                    !activeSizes.includes(siz) || !color || !productVariants
                  }
                  onClick={() => setSize(siz)}
                >
                  {siz}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
