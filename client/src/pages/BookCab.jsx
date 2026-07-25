import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Unav from "../components/Unav";
import API from "../services/api";

function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [car, setCar] = useState({});

  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    bookingDate: "",
    pickupTime: "",
    distance: "",
  });

  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    try {
      const res = await API.get(`/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Automatic fare calculation
  const fare =
    Number(form.distance || 0) * Number(car.price || 0);

  const bookCab = async (e) => {
    e.preventDefault();

    try {
     await API.post("/bookings", {
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    carId: id,
    pickup: form.pickup,
    destination: form.destination,
    bookingDate: form.bookingDate,
    pickupTime: form.pickupTime,
    distance: Number(form.distance),
    amount: fare,
   });

      alert("Cab Booked Successfully");

      navigate("/mybookings");
    } catch (err) {
      alert(
        err.response?.data?.message || "Booking Failed"
      );
    }
  };

  return (
    <>
      <Unav />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Book Your Cab
          </h2>

          <h5 className="text-primary">
            {car.carName}
          </h5>

          <p>
            Price Per KM : <strong>₹{car.price}</strong>
          </p>

          <form onSubmit={bookCab}>

            <input
              className="form-control mt-3"
              name="pickup"
              placeholder="Pickup Location"
              value={form.pickup}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mt-3"
              name="destination"
              placeholder="Destination"
              value={form.destination}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mt-3"
              type="date"
              name="bookingDate"
              value={form.bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mt-3"
              type="time"
              name="pickupTime"
              value={form.pickupTime}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mt-3"
              type="number"
              name="distance"
              placeholder="Distance (KM)"
              value={form.distance}
              onChange={handleChange}
              min="1"
              required
            />

            <div className="alert alert-success mt-4">

              <h5>Estimated Fare</h5>

              <h3>₹ {fare}</h3>

            </div>

            <button className="btn btn-primary w-100">
              Confirm Booking
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default BookCab;