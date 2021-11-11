import ProductSchema from './Product.schema.js'

export const getProduct = () => {
  return ProductSchema.find()
}
