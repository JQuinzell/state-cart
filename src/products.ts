import { z } from '@builder.io/qwik-city'

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
	price: z.number(),
	images: z.array(z.string()),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductResponseSchema = z.object({
  products: z.array(ProductSchema),
})
