import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/User.router.js'

const server = express()

server.use(express.json())
dotenv.config()
// connect mongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected MongoDB")
}).catch((error) => {
    console.log("Connecting MongoDB Error:", error)
})

// routes
server.use("/api/users", userRouter)

export default server