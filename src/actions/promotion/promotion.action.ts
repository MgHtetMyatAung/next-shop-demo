"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPromotion(data: Promotion) {
  try {
    const promotion = await prisma.promotion.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        discount: Number(data.discount) ?? 0,
        cashback: Number(data.cashback) ?? 0,
        isBOGO: data.isBOGO,
        isActive: data.isActive || false,
        imageUrl: data.imageUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        products: {
          connect: data.productIds?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/promotion");
    return { success: true, promotion };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getAllPromotions() {
  try {
    const promotions = await prisma.promotion.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        discount: true,
        cashback: true,
        isBOGO: true,
        isActive: true,
        imageUrl: true,
        startDate: true,
        endDate: true,
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, promotions };
  } catch (error) {
    return { success: false };
  }
}

export async function getPromotionById(id: number) {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        discount: true,
        cashback: true,
        isActive: true,
        imageUrl: true,
        startDate: true,
        endDate: true,
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { success: true, promotion };
  } catch (error) {
    return { success: false };
  }
}

export async function updatePromotion(data: Promotion) {
  try {
    const promotion = await prisma.promotion.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        discount: Number(data.discount) ?? 0,
        cashback: Number(data.cashback) ?? 0,
        isBOGO: data.isBOGO,
        isActive: data.isActive || false,
        imageUrl: data.imageUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        products: {
          set: data.productIds?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/promotion");
    revalidatePath("/");
    return { success: true, promotion };
  } catch (error) {
    return { success: false };
  }
}

export async function deletePromotion(id: number) {
  try {
    const promotion = await prisma.promotion.delete({
      where: {
        id,
      },
    });
    revalidatePath("/promotion");
    revalidatePath("/");
    return { success: true, promotion };
  } catch (error) {
    return { success: false };
  }
}

export async function getPromotionCount() {
  try {
    const promotionCount = await prisma.promotion.count();
    return { success: true, promotionCount };
  } catch (error) {
    return { success: false };
  }
}
