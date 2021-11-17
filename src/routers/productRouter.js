import express from 'express'
import { getProducts } from '../models/product/Product.model.js'
const Router = express.Router()

Router.get('/', async (req, res) => {
  try {
    const products = await getProducts()

    res.json({
      status: 'success',
      message: 'request success',
      products,
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      status: 'error',
      message: 'error, unable to process your request, try again',
    })
  }
})
export default Router
