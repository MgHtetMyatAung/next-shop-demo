"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: CategoryType) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        parentId: Number(data.parentId) === 0 ? null : Number(data.parentId),
      },
    });

    revalidatePath("/category");
    return { success: true, category };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getTopCategory() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    return { success: true, categories };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getAllCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        parentId: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, categories };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getMainCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, categories };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getSubCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, categories };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getCategoryById(id: number) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return { success: true, category };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function editCategory(data: CategoryType) {
  try {
    if (!data.id) return { success: false, error: "Category id is required" };
    const category = await prisma.category.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        parentId: Number(data.parentId) === 0 ? null : Number(data.parentId),
      },
    });
    revalidatePath("/category");
    return { success: true, category };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function deleteCategory(id: number) {
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    revalidatePath("/category");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
