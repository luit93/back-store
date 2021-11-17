import ProductSchema from './Product.schema.js'

export const getProducts = () => {
  return ProductSchema.find()
}
