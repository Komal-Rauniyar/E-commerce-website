import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, description, price, imageUrl, category, sellerId } = await req.json()

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
        sellerId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}

