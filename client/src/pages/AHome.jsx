import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Anav from "../components/Anav";
import DashboardCharts from "../components/DashboardCharts";

function AHome() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    completed: 0,
    booked: 0,
    started: 0,
    cancelled: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Anav />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg,#fff8e1,#ffe082,#ffd54f)",
        }}
      >
        <div className="container">

          {/* Hero Section */}
          <div
            className="card border-0 shadow-lg mb-5"
            style={{
              borderRadius: "25px",
              background: "linear-gradient(135deg,#212529,#343a40)",
              color: "#fff",
            }}
          >
            <div className="card-body p-5">

              <div className="row align-items-center">

                <div className="col-lg-8">

                  <h1 className="display-5 fw-bold text-warning">
                    Welcome, {admin?.name}
                  </h1>

                  <p className="lead">
                    UCAB Administrator Dashboard
                  </p>

                  <p className="text-light">
                    Manage users, vehicles and bookings with complete control.
                  </p>

                </div>

                <div className="col-lg-4 text-center">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
                    alt="Admin"
                    style={{
                      width: "170px",
                    }}
                  />

                </div>

              </div>

            </div>
          </div>

          {/* Statistics */}

          <div className="row mb-4">

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-4">
                <h1 className="text-primary">{stats.totalUsers}</h1>
                <h5>Users</h5>
                <small className="text-muted">
                  Registered Customers
                </small>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-4">
                <h1 className="text-success">{stats.totalCars}</h1>
                <h5>Cars</h5>
                <small className="text-muted">
                  Available Fleet
                </small>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-4">
                <h1 className="text-warning">{stats.totalBookings}</h1>
                <h5>Bookings</h5>
                <small className="text-muted">
                  Total Bookings
                </small>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-4">
                <h1 className="text-danger">₹{stats.revenue}</h1>
                <h5>Revenue</h5>
                <small className="text-muted">
                  Completed Trips
                </small>
              </div>
            </div>

          </div>

          {/* Booking Status */}

          <div className="row mb-5">

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-3">
                <h2 className="text-primary">{stats.booked}</h2>
                <p className="mb-0">Booked</p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-3">
                <h2 className="text-warning">{stats.started}</h2>
                <p className="mb-0">Started</p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-3">
                <h2 className="text-success">{stats.completed}</h2>
                <p className="mb-0">Completed</p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow text-center p-3">
                <h2 className="text-danger">{stats.cancelled}</h2>
                <p className="mb-0">Cancelled</p>
              </div>
            </div>

          </div>

          {/* Charts */}

          <DashboardCharts stats={stats} />

          {/* Dashboard Cards */}

          <div className="row mt-5">

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow border-0 h-100 dashboard-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <div style={{ fontSize: "55px" }}>👥</div>
                  <h4 className="fw-bold mt-3">Users</h4>
                  <p className="text-muted">
                    Manage registered users.
                  </p>

                  <Link
                    to="/admin/users"
                    className="btn btn-primary w-100"
                  >
                    Manage Users
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow border-0 h-100 dashboard-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <div style={{ fontSize: "55px" }}>🚕</div>

                  <h4 className="fw-bold mt-3">Cars</h4>

                  <p className="text-muted">
                    View and edit cars.
                  </p>

                  <Link
                    to="/admin/cars"
                    className="btn btn-success w-100"
                  >
                    Manage Cars
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow border-0 h-100 dashboard-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <div style={{ fontSize: "55px" }}>➕</div>

                  <h4 className="fw-bold mt-3">Add Car</h4>

                  <p className="text-muted">
                    Add new vehicles.
                  </p>

                  <Link
                    to="/admin/addcar"
                    className="btn btn-warning w-100"
                  >
                    Add Car
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow border-0 h-100 dashboard-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <div style={{ fontSize: "55px" }}>📖</div>

                  <h4 className="fw-bold mt-3">Bookings</h4>

                  <p className="text-muted">
                    View customer bookings.
                  </p>

                  <Link
                    to="/admin/bookings"
                    className="btn btn-danger w-100"
                  >
                    View Bookings
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Information */}

          <div
            className="card shadow-lg border-0 mt-5"
            style={{ borderRadius: "20px" }}
          >
            <div className="card-body p-5">

              <h2 className="text-warning fw-bold mb-4">
                Administrator Features
              </h2>

              <div className="row">

                <div className="col-md-6">

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                      👥 User Management
                    </li>

                    <li className="list-group-item">
                      🚖 Vehicle Management
                    </li>

                    <li className="list-group-item">
                      ➕ Add New Cars
                    </li>

                  </ul>

                </div>

                <div className="col-md-6">

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                      📖 Booking Management
                    </li>

                    <li className="list-group-item">
                      ✅ Update Ride Status
                    </li>

                    <li className="list-group-item">
                      ⚙ Full System Administration
                    </li>

                  </ul>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AHome;