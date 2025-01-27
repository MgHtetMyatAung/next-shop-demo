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
        out_of_stock: data.out_of_stock,
      },
    });
    revalidatePath("/product");
    return { success: true, product };
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
        out_of_stock: true,
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

export async function getProductDetail(id: number) {
  try {
    if (!id) {
      return { success: false };
    }
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        published: true,
        out_of_stock: true,
        brandId: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        variants: {
          select: {
            id: true,
            price: true,
            stock: true,
            color: true,
            size: true,
          },
        },
      },
    });
    return { success: true, product };
  } catch (error) {
    return { success: false };
  }
}

export async function updateProduct(data: ProductType) {
  try {
    if (!data.id) {
      return { success: false };
    }
    const product = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId:
          Number(data.categoryId) !== 0 ? Number(data.categoryId) : null,
        brandId: Number(data.brandId) !== 0 ? Number(data.brandId) : null,
        published: data.published,
        out_of_stock: data.out_of_stock,
      },
    });
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.log("error");
    return { success: false };
  }
}

export async function deleteProduct(id: number) {
  try {
    if (!id) {
      return { success: false };
    }
    await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.log("error");
    return { success: false };
  }
}
