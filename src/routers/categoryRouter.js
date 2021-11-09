import express from 'express'
import { getCategory } from '../models/category/Category.model.js'
const Router = express.Router()

Router.get('/', async (req, res) => {
  try {
    const categories = await getCategory()

    res.json({
      status: 'success',
      message: 'request success',
      categories,
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
