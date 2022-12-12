export type Product = {
  brand: string
  category: string
  description: string
  discountPercengate: number
  id: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export type FetchResult = {
  loading: boolean
  errorMsg: string
  productList: Product[]
  total: number
}
