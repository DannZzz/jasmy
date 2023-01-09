import express from 'express'
import { PORT } from './config.js'
import connectMongo from './db/connect.js'
import ApiRouter from './routes/ApiRouter.js'

const app = express()

app.use(express.json())
app.use('/api/v1', ApiRouter)

connectMongo()

app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`)
})
