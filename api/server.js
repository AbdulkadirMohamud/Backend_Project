import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/user.router.js'
import propertiesRouter from './routers/property.router.js'

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
server.get("/", (req,res) => {
    res.status(200).json({success: true, message: "api is working"})
} )
server.use("/api/users", userRouter)
server.use("/api/properties", propertiesRouter)

export default server