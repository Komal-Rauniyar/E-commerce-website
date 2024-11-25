import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getSellerProducts(sellerId: string) {
  return await prisma.product.findMany({
    where: { sellerId },
  })
}

async function getSellerOrders(sellerId: string) {
  return await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          product: {
            sellerId,
          },
        },
      },
    },
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
}

export default async function SellerDashboard() {
  const session = await getServerSession()

  if (!session || session.user.role !== "SELLER") {
    redirect("/auth/signin")
  }

  const products = await getSellerProducts(session.user.id)
  const orders = await getSellerOrders(session.user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.user.name}</td>
                  <td className="border p-2">${order.total.toFixed(2)}</td>
                  <td className="border p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

