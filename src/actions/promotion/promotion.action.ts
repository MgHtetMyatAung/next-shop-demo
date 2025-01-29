"use server";

import { prisma } from "@/lib/prisma";

export async function getPromotionCount() {
  try {
    const promotionCount = await prisma.promotion.count();
    return { success: true, promotionCount };
  } catch (error) {
    return { success: false };
  }
}
