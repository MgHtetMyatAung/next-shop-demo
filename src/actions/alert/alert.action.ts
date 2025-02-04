"use server";

import { prisma } from "@/lib/prisma";

export async function createAlert(data: Alert) {
  try {
    const alert = await prisma.alert.create({
      data: {
        title: data.title,
        message: data.message,
        isActive: data.isActive,
      },
    });
    return { success: true, alert };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getAlert() {
  try {
    const alert = await prisma.alert.findFirst();
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
      },
    });
    return { success: true, alert };
  } catch (error) {
    return { success: false, error };
  }
}
