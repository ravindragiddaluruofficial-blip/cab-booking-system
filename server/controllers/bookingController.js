const Booking = require("../models/MyBookingSchema");

// Create Booking
exports.bookCab = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      carId,
      pickup,
      destination,
      bookingDate,
      pickupTime,
      distance,
      amount,
    } = req.body;

    // Check if the cab is already booked on the selected date
    const existingBooking = await Booking.findOne({
      carId,
      bookingDate: new Date(bookingDate),
      status: {
        $in: ["Booked", "Started"],
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This cab is already booked for the selected date.",
      });
    }

    const booking = await Booking.create({
      userId,
      userName,
      userEmail,
      carId,
      pickup,
      destination,
      bookingDate,
      pickupTime,
      distance,
      amount,
      status: "Booked",
    });

    res.status(201).json({
      success: true,
      message: "Cab Booked Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("carId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId")
      .populate("carId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.status === "Cancelled" ||
      booking.status === "Completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "This booking cannot be edited.",
      });
    }

    // Admin updates only status
    if (
      req.body.status &&
      Object.keys(req.body).length === 1
    ) {
      booking.status = req.body.status;

      await booking.save();

      return res.json({
        success: true,
        message: "Booking Status Updated Successfully",
        booking,
      });
    }

    // Check duplicate booking only if booking date is changed
    if (req.body.bookingDate) {
      const existingBooking = await Booking.findOne({
        _id: { $ne: req.params.id },
        carId: booking.carId,
        bookingDate: new Date(req.body.bookingDate),
        status: {
          $in: ["Booked", "Started"],
        },
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "This cab is already booked on that date.",
        });
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Booking Updated Successfully",
      booking: updatedBooking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Booking Permanently
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    if (booking.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be cancelled",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};