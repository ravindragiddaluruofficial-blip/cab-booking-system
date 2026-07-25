const User = require("../models/UserSchema");
const Car = require("../models/CarSchema");
const Booking = require("../models/MyBookingSchema");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const completed = await Booking.countDocuments({
      status: "Completed",
    });

    const booked = await Booking.countDocuments({
      status: "Booked",
    });

    const started = await Booking.countDocuments({
      status: "Started",
    });

    const cancelled = await Booking.countDocuments({
      status: "Cancelled",
    });

    const revenue = await Booking.aggregate([
      {
        $match: {
          status: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalCars,
      totalBookings,
      completed,
      booked,
      started,
      cancelled,
      revenue: revenue.length ? revenue[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};