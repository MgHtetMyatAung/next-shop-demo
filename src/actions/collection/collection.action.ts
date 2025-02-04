"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCollection(data: Collection) {
  try {
    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        products: {
          connect: data.productIds ? data.productIds.map((id) => ({ id })) : [],
        },
      },
    });
    revalidatePath("/collection");
    return { success: true, collection };
  } catch (error) {
    return { success: false };
  }
}

export async function getAllCollections() {
  try {
    const collections = await prisma.collection.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        products: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, collections };
  } catch (error) {
    return { success: false };
  }
}

export async function getCollectionById(id: number) {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { success: true, collection };
  } catch (error) {
    return { success: false };
  }
}

export async function updateCollection(data: Collection) {
  try {
    await prisma.collection.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        products: {
          set: data.productIds ? data.productIds.map((id) => ({ id })) : [],
        },
      },
    });
    revalidatePath("/collection");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteCollection(id: number) {
  try {
    await prisma.collection.delete({
      where: {
        id,
      },
    });
    revalidatePath("/collection");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
