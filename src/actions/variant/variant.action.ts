"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVariant(data: Variant) {
  try {
    const variant = await prisma.variant.create({
      data: {
        color: data.color,
        size: data.size,
        productId: Number(data.productId),
        price: Number(data.price),
        stock: Number(data.stock),
      },
    });

    revalidatePath("/product");
    return { success: true, variant };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateVariant(data: Variant) {
  try {
    if (!data.id) return { success: false, error: "Variant id is required" };
    const variant = await prisma.variant.update({
      where: {
        id: data.id,
      },
      data: {
        color: data.color,
        size: data.size,
        productId: data.productId,
        price: data.price,
        stock: data.stock,
      },
    });

    revalidatePath("/variant");
    return { success: true, variant };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteVariant(id: number) {
  try {
    await prisma.variant.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/variant");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getVariantByProductId(productId: number) {
  try {
    const variants = await prisma.variant.findMany({
      where: {
        productId: productId,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, variants };
  } catch (error) {
    return { success: false, error };
  }
}
