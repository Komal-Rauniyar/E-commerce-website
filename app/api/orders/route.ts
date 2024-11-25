import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { userId, items, total } = await req.json()

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Error creating order" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }
}

