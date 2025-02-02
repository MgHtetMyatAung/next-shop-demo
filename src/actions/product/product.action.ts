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
        image: data.image,
      },
    });
    revalidatePath("/product");
    revalidatePath("/");
    revalidatePath("/view");
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
        image: true,
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

export async function getProductCount() {
  try {
    const productCount = await prisma.product.count();
    return { success: true, productCount };
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
        image: true,
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

export async function getLatestProducts(total: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
      },
      take: total,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        out_of_stock: true,
        image: true,
        brandId: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        promotion: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            discount: true,
            cashback: true,
            isBOGO: true,
            isActive: true,
            startDate: true,
            endDate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, products };
  } catch (error) {
    return { success: false };
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        collectionId: null,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return { success: true, products };
  } catch (error) {
    return { success: false };
  }
}

export async function getAllProductsByPromotion() {
  try {
    const products = await prisma.product.findMany({
      where: {
        promotionId: null,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return { success: true, products };
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
        image: data.image,
      },
    });
    revalidatePath("/");
    revalidatePath("/view");
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

export async function deleteManyProductById(ids: number[]) {
  try {
    if (!ids) {
      return { success: false };
    }
    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.log("error");
    return { success: false };
  }
}
