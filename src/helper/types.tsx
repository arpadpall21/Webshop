import { ImgHTMLAttributes } from "react"

export type Product = {
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

export type StoreState = {
  cartProducts: number[]
}

export type StoreAction = {
  type: string
  payload: {
    actionName: 'addProductToCart' | 'removeProductFromCart',
    productId: number
  }
}
