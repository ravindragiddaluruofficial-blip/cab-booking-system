import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Unav from "../components/Unav";

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    pickup: "",
    destination: "",
    bookingDate: "",
    pickupTime: "",
    distance: "",
    amount: 0,
  });

  const [pricePerKm, setPricePerKm] = useState(0);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const res = await API.get(`/bookings/${id}`);

      setBooking({
        pickup: res.data.pickup,
        destination: res.data.destination,
        bookingDate: res.data.bookingDate.substring(0, 10),
        pickupTime: res.data.pickupTime || "",
        distance: res.data.distance,
        amount: res.data.amount,
      });

      setPricePerKm(res.data.carId.price);
    } catch (err) {
      console.log(err);
      alert("Failed to load booking");
    }
  };

  const handleChange = (e) => {
    const updated = {
      ...booking,
      [e.target.name]: e.target.value,
    };

    if (
      e.target.name === "distance" ||
      booking.distance !== updated.distance
    ) {
      updated.amount =
        Number(updated.distance || 0) * Number(pricePerKm);
    }

    setBooking(updated);
  };

  const updateBooking = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/bookings/${id}`, booking);

      alert("Booking Updated Successfully");

      navigate("/mybookings");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  return (
    <>
      <Unav />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Edit Booking
          </h2>

          <form onSubmit={updateBooking}>

            <input
              className="form-control mb-3"
              name="pickup"
              placeholder="Pickup"
              value={booking.pickup}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="destination"
              placeholder="Destination"
              value={booking.destination}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              name="bookingDate"
              value={booking.bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              className="form-control mb-3"
              name="pickupTime"
              value={booking.pickupTime}
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-3"
              name="distance"
              placeholder="Distance (KM)"
              value={booking.distance}
              min="1"
              onChange={handleChange}
              required
            />

            <div className="alert alert-success">

              <h5>Estimated Fare</h5>

              <h3>₹ {booking.amount}</h3>

            </div>

            <button className="btn btn-primary w-100">
              Update Booking
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditBooking;