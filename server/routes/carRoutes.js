import express from "express";
import {
  deleteCarModel,
  getAllCarModels,
  getSingleCarModel,
  uploadCarModel,
} from "../controllers/carController.js";

const router = express.Router();

// Upload Model
router.post("/upload_model", uploadCarModel);

// Get All Car Models
router.get("/allCars", getAllCarModels);
// Get Single Model
router.get("/single_Model/:id", getSingleCarModel);

// Delete Model
router.delete("/delete_Model/:id", deleteCarModel);

export default router;
