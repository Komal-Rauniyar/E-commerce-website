import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const products = [
  { id: 1, name: "Floral Notebook Set", price: 19.99, category: "Notebooks", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Pastel Pen Collection", price: 24.99, category: "Pens & Pencils", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Handcrafted Bookmark Set", price: 14.99, category: "Desk Accessories", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Washi Tape Assortment", price: 9.99, category: "Gift Wrapping", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Leather Journal", price: 29.99, category: "Notebooks", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Calligraphy Pen Set", price: 34.99, category: "Pens & Pencils", image: "/placeholder.svg?height=200&width=200" },
]

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <p className="mt-2 text-sm text-gray-600">{product.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/products/${product.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

