import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const products = [
  { id: 1, name: "Floral Notebook Set", price: 19.99, category: "Notebooks", image: "/placeholder.svg?height=400&width=400", description: "A beautiful set of floral-themed notebooks perfect for journaling or note-taking." },
  { id: 2, name: "Pastel Pen Collection", price: 24.99, category: "Pens & Pencils", image: "/placeholder.svg?height=400&width=400", description: "A collection of smooth-writing pens in soothing pastel colors." },
  // ... add other products here
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-auto" />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <Button size="lg">Add to Cart</Button>
      </div>
    </div>
  )
}

