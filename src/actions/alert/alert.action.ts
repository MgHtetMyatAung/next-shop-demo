"use server";

import { prisma } from "@/lib/prisma";

export async function createAlert(data: Alert) {
  try {
    const alert = await prisma.alert.create({
      data: {
        title: data.title,
        message: data.message,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
      },
    });
    return { success: true, alert };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getAlert() {
  try {
    const alert = await prisma.alert.findFirst({
      select: {
        id: true,
        title: true,
        message: true,
        isActive: true,
        imageUrl: true,
        linkUrl: true,
      },
    });
    return { success: true, alert };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateAlert(data: Alert) {
  try {
    const alert = await prisma.alert.update({
      where: { id: data.id },
      data: {
        title: data.title,
        message: data.message,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
      },
    });
    return { success: true, alert };
  } catch (error) {
    return { success: false, error };
  }
}
