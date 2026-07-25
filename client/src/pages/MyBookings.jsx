import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Unav from "../components/Unav";
import generateInvoice from "../utils/generateInvoice";
import BookingTimeline from "../components/BookingTimeline";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");

      const myBookings = res.data.filter(
        (booking) => booking.userId?._id === user._id
      );

      setBookings(myBookings);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.put(`/bookings/cancel/${id}`);

      alert("Booking Cancelled Successfully");

      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel Failed");
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Booked":
        return "primary";
      case "Started":
        return "warning";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Unav />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(to right,#fff8e1,#ffffff,#fff8e1)",
        }}
      >
        <div className="container">

          <div className="text-center mb-5">
            <h1 className="fw-bold text-warning">
              🚖 My Bookings
            </h1>

            <p className="text-muted fs-5">
              Manage your booked rides.
            </p>
          </div>

          <div className="row">

            {bookings.length > 0 ? (
              bookings.map((booking) => (

                <div
                  className="col-lg-6 mb-4"
                  key={booking._id}
                >
                  <div
                    className="card border-0 shadow-lg h-100"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <div className="card-body p-4">

                      <div className="d-flex justify-content-between align-items-center">

                        <h3 className="fw-bold text-warning mb-0">
                         🚖 {booking.carId?.carName || booking.carName || "Deleted Car"}
                         </h3>

                        <span
                          className={`badge bg-${badgeColor(
                            booking.status
                          )} fs-6`}
                        >
                          {booking.status}
                        </span>

                      </div>

                      <hr />

                      <div className="mb-3">

                        <h6 className="text-muted">
                          📍 Pickup Location
                        </h6>

                        <h5>{booking.pickup}</h5>

                      </div>

                      <div className="text-center fs-3 text-warning">
                        ↓
                      </div>

                      <div className="mb-3">

                        <h6 className="text-muted">
                          🏁 Destination
                        </h6>

                        <h5>{booking.destination}</h5>

                      </div>

                      <div className="row mt-4">

                        <div className="col-6">
                          <small className="text-muted">
                            Booking Date
                          </small>

                          <h6>
                            📅 {booking.bookingDate?.substring(0, 10)}
                          </h6>
                        </div>

                        <div className="col-6">
                          <small className="text-muted">
                            Pickup Time
                          </small>

                          <h6>
                            🕒 {booking.pickupTime || "-"}
                          </h6>
                        </div>

                      </div>

                      <div className="row mt-3">

                        <div className="col-6">
                          <small className="text-muted">
                            Distance
                          </small>

                          <h5>
                            📏 {booking.distance} KM
                          </h5>
                        </div>

                        <div className="col-6 text-end">
                          <small className="text-muted">
                            Total Fare
                          </small>

                          <h3 className="text-success fw-bold">
                            ₹{booking.amount}
                          </h3>
                        </div>

                      </div>

                     <div className="d-flex gap-2 mt-4">

  {booking.status === "Booked" && (
    <>
      <Link
        to={`/editbooking/${booking._id}`}
        className="btn btn-warning flex-fill fw-bold"
      >
        ✏️ Edit Booking
      </Link>

      <button
        className="btn btn-danger flex-fill fw-bold"
        onClick={() => cancelBooking(booking._id)}
      >
        ❌ Cancel
      </button>
    </>
  )}
  <BookingTimeline status={booking.status} />

  <button
    className="btn btn-success flex-fill fw-bold"
    onClick={() => generateInvoice(booking)}
  >
    📄 Invoice
  </button>

</div>

                    </div>
                  </div>
                </div>

              ))
            ) : (
              <div className="text-center py-5">

                <h1 style={{ fontSize: "80px" }}>
                  🚖
                </h1>

                <h3>No Bookings Yet</h3>

                <p className="text-muted">
                  Book your first ride today.
                </p>

                <Link
                  to="/cabs"
                  className="btn btn-warning btn-lg fw-bold mt-3"
                >
                  Book a Cab
                </Link>

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default MyBookings;