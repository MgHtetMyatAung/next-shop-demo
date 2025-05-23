"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSetting(data: Setting) {
  try {
    const setting = await prisma.setting.create({
      data: {
        storeName: data.storeName,
        defaultLanguage: data.defaultLanguage || "ENGLISH",
        allowOutOfStockPurchase: data.allowOutOfStockPurchase,
        autoPublish: data.autoPublish,
      },
    });
    revalidatePath("/view");
    return { success: true, setting };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getSetting() {
  try {
    const setting = await prisma.setting.findFirst({
      select: {
        id: true,
        storeName: true,
        defaultLanguage: true,
        allowOutOfStockPurchase: true,
        autoPublish: true,
      },
    });
    return { success: true, setting };
  } catch (error) {
    return { success: false };
  }
}

export async function updateSetting(data: Setting) {
  try {
    const setting = await prisma.setting.update({
      where: { id: data.id },
      data: {
        storeName: data.storeName,
        defaultLanguage: data.defaultLanguage,
        allowOutOfStockPurchase: data.allowOutOfStockPurchase,
        autoPublish: data.autoPublish,
      },
    });
    revalidatePath("/view");
    return { success: true, setting };
  } catch (error) {
    return { success: false };
  }
}
