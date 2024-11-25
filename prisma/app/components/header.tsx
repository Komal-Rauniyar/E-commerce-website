import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Creative Stationery & Gifts
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li>
            <li><Link href="/cart" className="text-gray-600 hover:text-gray-800"><ShoppingCart /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

