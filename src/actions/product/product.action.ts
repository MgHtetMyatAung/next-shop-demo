"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data: ProductType) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId:
          Number(data.categoryId) !== 0 ? Number(data.categoryId) : null,
        brandId: Number(data.brandId) !== 0 ? Number(data.brandId) : null,
        published: data.published,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("error");
    return { success: false };
  }
}

export async function getProducts({
  page = 1,
  limit = 5,
}: {
  page: number;
  limit: number;
}) {
  try {
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        published: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, products, totalPages, totalItems };
  } catch (error) {
    return { success: false };
  }
}
