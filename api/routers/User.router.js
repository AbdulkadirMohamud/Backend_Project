import express from 'express'
import { login, signup, user, userDelete, userUpdate, users } from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()
// router endpoints
router.post("/signup",  signup)
router.post("/login", login)
router.get("/", users)
router.get("/user", verifyToken, user)
router.put("/update", verifyToken, userUpdate)
router.delete("/delete", verifyToken, userDelete)
export default router







