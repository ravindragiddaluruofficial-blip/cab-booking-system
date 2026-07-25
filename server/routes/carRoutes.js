const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");

const {
  addCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");

// Add Car (Image Upload)
router.post("/", upload.single("image"), addCar);

// Get All Cars
router.get("/", getCars);

// Get Single Car
router.get("/:id", getCar);

// Update Car (Image Upload)
router.put("/:id", upload.single("image"), updateCar);

// Delete Car
router.delete("/:id", deleteCar);

module.exports = router;