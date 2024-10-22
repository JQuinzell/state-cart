import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { useCart } from '~/CartContext'

export default component$(() => {
  const cart = useCart()
  return (
    <main>
      <h1>Cart</h1>
      <ul>
        {cart.value.map((product) => (
          <li key={product.id}>
            {product.title}: ${product.price}
          </li>
        ))}
      </ul>
      <p>
        Total: ${cart.value.reduce((acc, product) => acc + product.price, 0)}
      </p>
      <Link href='/'>Back</Link>
    </main>
  )
})
