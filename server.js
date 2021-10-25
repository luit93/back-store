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

//connecting to mongoDB
import mongoClient from './src/config/db.js'
mongoClient()
//load routers

//user routers
// app.use()

app.use('/', (req, res) => {
  res.send('this is the abyss')
})
app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
  }
  console.log(`server running at http://localhost:${PORT}`)
})
