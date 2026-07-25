const express = require("express");

const router = express.Router();

const {
  bookCab,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
} = require("../controllers/bookingController");

// Book Cab
router.post("/", bookCab);

// Get All Bookings
router.get("/", getBookings);

// Get Single Booking
router.get("/:id", getBooking);

// Update Booking
router.put("/:id", updateBooking);

// Cancel Booking
router.put("/cancel/:id", cancelBooking);

// Delete Booking (Admin)
router.delete("/:id", deleteBooking);

module.exports = router;