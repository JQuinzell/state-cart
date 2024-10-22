import { component$ } from '@builder.io/qwik'
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { useCart } from '~/CartContext'
import { ProductResponseSchema } from '~/products'

export const useProducts = routeLoader$(async (event) => {
  const pageSize = 30
  const page = parseInt(event.query.get('page') ?? '1')
  const data = await fetch(
    `https://dummyjson.com/products?skip=${(page - 1) * pageSize}`
  ).then((res) => res.json())
  const res = ProductResponseSchema.parse(data)
  return res.products
})

export default component$(() => {
  const loc = useLocation()
  const products = useProducts()
  const cart = useCart()
  const page = parseInt(loc.url.searchParams.get('page') ?? '1')
  return (
    <>
      <h1>Hi 👋</h1>
      <h2>
        <Link href='/cart'>
          Cart {cart.value.length > 0 && `(${cart.value.length})`}
        </Link>
      </h2>
      <ul>
        {cart.value.map((product) => (
          <li key={product.id}>
            {product.title}: ${product.price}
          </li>
        ))}
      </ul>
      <ul>
        {products.value.map((product) => (
          <li key={product.id}>
            {product.title}: ${product.price}
            <button onClick$={() => (cart.value = [...cart.value, product])}>
              Buy
            </button>
          </li>
        ))}
      </ul>
      <div>
        <Link href={`?page=${page - 1}`}>Previous</Link>
        <Link href={`?page=${page + 1}`}>Next</Link>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
