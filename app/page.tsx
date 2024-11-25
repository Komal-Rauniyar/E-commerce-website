import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const featuredProducts = [
    { id: 1, name: "Floral Notebook Set", price: 19.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Pastel Pen Collection", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Handcrafted Bookmark Set", price: 14.99, image: "/placeholder.svg?height=200&width=200" },
  ]

  const categories = [
    { name: "Notebooks", image: "/placeholder.svg?height=150&width=150" },
    { name: "Pens & Pencils", image: "/placeholder.svg?height=150&width=150" },
    { name: "Desk Accessories", image: "/placeholder.svg?height=150&width=150" },
    { name: "Gift Wrapping", image: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">Welcome to Creative Stationery & Gifts</h1>
        <p className="text-xl text-gray-600 mb-4">Discover unique stationery and gift items that inspire creativity.</p>
        <Link href="/products">
          <Button>Shop Now</Button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </CardContent>
              <CardFooter>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link href={`/products?category=${category.name.toLowerCase()}`} key={category.name} className="text-center">
              <img src={category.image} alt={category.name} className="w-full h-36 object-cover rounded-lg mb-2" />
              <p className="font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

