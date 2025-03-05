import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  return NextResponse.json({ collections: collections }, { status: 200 });
}
