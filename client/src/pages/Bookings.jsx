import { useEffect, useState } from "react";
import API from "../services/api";
import Anav from "../components/Anav";
import * as XLSX from "xlsx";

function Bookings() {
  const [bookings, setBookings] =useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  // Load Bookings
  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, { status });

      alert("Booking Status Updated");

      loadBookings();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;

    try {
      await API.delete(`/bookings/${id}`);

      alert("Booking Deleted Successfully");

      loadBookings();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // Status Badge
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

  // Search
  const filteredBookings = bookings.filter((booking) => {
    const keyword = search.toLowerCase();

    return (
      (booking.userId?.name || booking.userName || "")
        .toLowerCase()
        .includes(keyword) ||
      (booking.carId?.carName || booking.carName || "")
        .toLowerCase()
        .includes(keyword) ||
      booking.pickup.toLowerCase().includes(keyword) ||
      booking.destination.toLowerCase().includes(keyword)
    );
  });

  // Export Excel
  const exportExcel = () => {
    const data = filteredBookings.map((booking) => ({
      User: booking.userId?.name || booking.userName,
      Car: booking.carId?.carName || booking.carName,
      Pickup: booking.pickup,
      Destination: booking.destination,
      Date: booking.bookingDate?.substring(0, 10),
      Time: booking.pickupTime,
      Distance: booking.distance,
      Fare: booking.amount,
      Status: booking.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Bookings"
    );

    XLSX.writeFile(workbook, "Bookings.xlsx");
  };

  return (
    <>
      <Anav />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Manage Bookings</h2>

          <button
            className="btn btn-success"
            onClick={exportExcel}
          >
            📊 Export Excel
          </button>

        </div>

        <div className="row mb-3">

          <div className="col-md-4 ms-auto">

            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">

            <tr>
              <th>#</th>
              <th>User</th>
              <th>Car</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Distance</th>
              <th>Fare</th>
              <th>Status</th>
              <th width="220">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredBookings.length > 0 ? (

              filteredBookings.map((booking, index) => (

                <tr key={booking._id}>

                  <td>{index + 1}</td>

                  <td>
                    {booking.userId?.name ||
                      booking.userName ||
                      "Deleted User"}
                  </td>

                  <td>
                    {booking.carId?.carName ||
                      booking.carName ||
                      "Deleted Car"}
                  </td>

                  <td>{booking.pickup}</td>

                  <td>{booking.destination}</td>

                  <td>
                    {booking.bookingDate?.substring(0, 10)}
                  </td>

                  <td>{booking.pickupTime || "-"}</td>

                  <td>{booking.distance} KM</td>

                  <td>₹{booking.amount}</td>

                  <td>

                    <span
                      className={`badge bg-${badgeColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td>

                    <select
                      className="form-select form-select-sm mb-2"
                      value={booking.status}
                      disabled={
                        booking.status === "Completed" ||
                        booking.status === "Cancelled"
                      }
                      onChange={(e) =>
                        updateStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Booked">Booked</option>
                      <option value="Started">Started</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="11"
                  className="text-center"
                >
                  No Bookings Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Bookings;