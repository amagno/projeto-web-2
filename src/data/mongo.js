import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


export const initConnection = () => {
  const mongourl = process.env.MONGO_URL || undefined

  if (!mongourl) {
    console.error('MONGO_URL is not defined on env')
    return null
  }
  mongoose.set('debug', process.env.NODE_ENV === 'dev')
  mongoose.Promise = Promise
  mongoose.connect(mongourl, { useMongoClient: true })

  const connection = mongoose.connection

  connection.on('error', (error) => {
    console.error(error)
  })
  connection.once('open', () => {
    console.log('connection to mongo successs')
  })

  return connection
}