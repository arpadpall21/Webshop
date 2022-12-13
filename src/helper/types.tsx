export interface Product {
  brand: string
  category: string
  description: string
  discountPercentage: number
  id: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export type FetchProductListResult = {
  loading: boolean
  error: boolean
  productList: Product[]
}

export type FetchProductResult = {
  loading: boolean
  error: boolean
  product: Product
}
