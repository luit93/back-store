import mongoose from 'mongoose'

const mongoClient = async () => {
  try {
    const mongoUrl = process.env.MONGO_CLIENT
    if (!mongoUrl) {
      return console.log(
        'pleae add mongoDB connection in env variable MONGO_CLIENT'
      )
    }
    const con = await mongoose.connect(mongoUrl)
    if (con) {
      console.log('MongoDB connected')
    }
  } catch (error) {
    console.log(error)
  }
}

export default mongoClient
