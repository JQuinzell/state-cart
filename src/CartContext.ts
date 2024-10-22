import type { Signal } from '@builder.io/qwik'
import {
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik'
import type { Product } from './products'

const CartContext = createContextId<Signal<Product[]>>('cart')

export const useCart = () => {
  return useContext(CartContext)
}

export const useCartProvider = () => {
  const cart = useSignal<Product[]>([])
  return useContextProvider(CartContext, cart)
}
