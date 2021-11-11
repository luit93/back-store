import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000
//middleware
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded())
app.use(express.json())
app.use(express.json())

//connecting to mongoDB
import mongoClient from './src/config/db.js'
mongoClient()
//load routers
import profileRouter from './src/routers/profileRouter.js'
import categoryRouter from './src/routers/categoryRouter.js'
import productRouter from './src/routers/productRouter.js'

//client user routers
app.use('/api/v1/user', profileRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)
// app.use()

app.use('/', (req, res) => {
  res.send('this is the abyss')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`server running at http://localhost:${PORT}`)
})
