"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRequestMessage(data: RequestMessage) {
  try {
    const request = await prisma.request.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
    revalidatePath("/request-message");
    return { success: true, request };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getRequestMessage() {
  try {
    const request = await prisma.request.findMany();
    return { success: true, request };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteRequestMessage(id: number) {
  try {
    await prisma.request.delete({
      where: { id },
    });
    revalidatePath("/request-message");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
