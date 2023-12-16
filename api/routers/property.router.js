import express from "express";
import {
  
  createProperty,
  deleteProperty,
  getProperties,
  updateImages,
  updateProperty,
} from "../controllers/property.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
// Property routers
router.get("/", getProperties);
router.post("/create", verifyToken, createProperty);
router.put("/update_images/:id", verifyToken, updateImages);
router.put("/update/:id", verifyToken, updateProperty);
router.delete("/delete/:id", verifyToken, deleteProperty);
export default router;