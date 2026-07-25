import { Link } from "react-router-dom";
import Unav from "../components/Unav";
import taxi from "../assets/taxi.png";

function Uhome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Unav />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg,#FFF8E1,#FFE082,#FFD54F)",
        }}
      >
        <div className="container">

          {/* Hero Section */}
          <div
            className="card shadow-lg border-0 mb-5"
            style={{
              borderRadius: "25px",
              overflow: "hidden",
            }}
          >
            <div className="row g-0 align-items-center">

              <div className="col-lg-7 p-5">

                <h1 className="display-5 fw-bold text-warning">
                  Welcome, {user?.name} 👋
                </h1>

                <p className="lead text-secondary mt-3">
                  Ready for your next ride?
                  Book a cab in seconds and enjoy a safe,
                  comfortable and affordable journey with UCAB.
                </p>

                <div className="mt-4">

                  <Link
                    to="/cabs"
                    className="btn btn-warning btn-lg me-3 fw-bold"
                  >
                    🚖 Book Now
                  </Link>

                  <Link
                    to="/mybookings"
                    className="btn btn-dark btn-lg fw-bold"
                  >
                    📖 My Bookings
                  </Link>

                </div>

              </div>

              <div className="col-lg-5 text-center p-4">

                <img
                  src={taxi}
                  alt="Taxi"
                  className="img-fluid taxi-image"
                  style={{
                    maxHeight: "320px",
                  }}
                />

              </div>

            </div>
          </div>

          {/* Quick Features */}

          <div className="row">

            <div className="col-md-4 mb-4">

              <div
                className="card shadow border-0 h-100 text-center"
                style={{ borderRadius: "20px" }}
              >

                <div className="card-body">

                  <h1>🚖</h1>

                  <h4 className="fw-bold">
                    Book Cab
                  </h4>

                  <p className="text-muted">
                    Choose from available cabs and
                    book instantly.
                  </p>

                  <Link
                    to="/cabs"
                    className="btn btn-warning"
                  >
                    View Cabs
                  </Link>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div
                className="card shadow border-0 h-100 text-center"
                style={{ borderRadius: "20px" }}
              >

                <div className="card-body">

                  <h1>📖</h1>

                  <h4 className="fw-bold">
                    Booking History
                  </h4>

                  <p className="text-muted">
                    Check all your bookings,
                    cancellations and rides.
                  </p>

                  <Link
                    to="/mybookings"
                    className="btn btn-success"
                  >
                    View History
                  </Link>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div
                className="card shadow border-0 h-100 text-center"
                style={{ borderRadius: "20px" }}
              >

                <div className="card-body">

                  <h1>🛡️</h1>

                  <h4 className="fw-bold">
                    Safe Journey
                  </h4>

                  <p className="text-muted">
                    Every ride comes with trusted
                    drivers and customer support.
                  </p>

                  <button
                    className="btn btn-dark"
                    disabled
                  >
                    24×7 Support
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* How It Works */}

          <div
            className="card shadow-lg border-0 mt-4"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center text-warning fw-bold mb-5">
                How UCAB Works
              </h2>

              <div className="row text-center">

                <div className="col-md-3">

                  <h1>1️⃣</h1>

                  <h5>Select Cab</h5>

                  <p className="text-muted">
                    Browse available vehicles.
                  </p>

                </div>

                <div className="col-md-3">

                  <h1>2️⃣</h1>

                  <h5>Book Ride</h5>

                  <p className="text-muted">
                    Choose pickup, destination and time.
                  </p>

                </div>

                <div className="col-md-3">

                  <h1>3️⃣</h1>

                  <h5>Enjoy Ride</h5>

                  <p className="text-muted">
                    Relax with verified drivers.
                  </p>

                </div>

                <div className="col-md-3">

                  <h1>4️⃣</h1>

                  <h5>Reach Safely</h5>

                  <p className="text-muted">
                    Complete your journey comfortably.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Uhome;