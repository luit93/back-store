import CategorySchema from './Category.schema.js'

export const getCategory = () => {
  return CategorySchema.find()
}
