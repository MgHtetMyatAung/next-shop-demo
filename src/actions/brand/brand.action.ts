"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type BrandType = {
  id?: number;
  name: string;
  description: string | null;
};

export async function createBrand(data: BrandType) {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    revalidatePath("/brand");
    revalidatePath("/");

    return { success: true, brand };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: { name: true, description: true, logoUrl: true, id: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, brands };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getBrandCount() {
  try {
    const brandCount = await prisma.brand.count();
    return { success: true, brandCount };
  } catch (error) {
    return { success: false };
  }
}

export async function editBrand(data: BrandType) {
  try {
    if (!data.id) return { success: false, error: "Something went wrong" };

    const brand = await prisma.brand.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    revalidatePath("/brand");
    return { success: true, brand };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function deleteBrand(id: number) {
  try {
    await prisma.brand.delete({
      where: {
        id,
      },
    });

    revalidatePath("/brand");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
