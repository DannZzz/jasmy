import mongoose, { connect } from 'mongoose'
import { MONGO_URL } from '../config.js'

export default function connectMongo(): void {
  mongoose.set('strictQuery', true)
  connect(MONGO_URL, (err) => {
    if (err) throw new Error(err.message)
    console.log('Database successfully connected')
  })
}
