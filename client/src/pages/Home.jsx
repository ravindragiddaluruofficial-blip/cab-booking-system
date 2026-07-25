import { Link } from "react-router-dom";
import taxi from "../assets/taxi.png";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #212529 100%)",
      }}
    >
      {/* Hero Section */}
      <div className="container py-5">

        <div className="row align-items-center">

          <div className="col-lg-6 text-white">

            <h1
              className="fw-bold"
              style={{
                fontSize: "3.8rem",
              }}
            >
              🚖 UCAB
            </h1>

            <h2 className="fw-bold mb-4">
              Book Your Ride Anytime, Anywhere
            </h2>

            <p
              className="lead"
              style={{
                maxWidth: "500px",
              }}
            >
              Travel safely with professional drivers at affordable prices.
              Book your cab in just a few clicks and enjoy a comfortable ride.
            </p>

            <div className="mt-4">

              <Link
                to="/login"
                className="btn btn-dark btn-lg me-3 px-4"
              >
                User Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-dark btn-lg px-4"
              >
                Register
              </Link>

            </div>

            <div className="mt-3">

              <Link
                to="/admin/login"
                className="btn btn-warning btn-lg fw-bold px-5"
              >
                Admin Login
              </Link>

            </div>

          </div>

          <div className="col-lg-6 text-center mt-5 mt-lg-0">

            <div
  className="card shadow-lg border-0"
  style={{
    borderRadius: "25px",
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(10px)",
  }}
>
              <div className="card-body p-5">

                <img
  src={taxi}
  alt="UCAB Taxi"
  className="img-fluid taxi-image"
  style={{
    maxHeight: "380px",
    objectFit: "contain",
    margin: "0 auto",
  }}
/>

<h2 className="fw-bold text-dark mt-4">
  Fast • Safe • Affordable
</h2>

<p className="text-muted mt-3 mb-0">
  Trusted by hundreds of customers for reliable, comfortable, and affordable rides.
</p>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Features */}
      <div className="container pb-5">

        <h2 className="text-center fw-bold mb-5 text-dark">
          Why Choose UCAB?
        </h2>

        <div className="row">

          <div className="col-md-3 mb-4">

            <div
              className="card h-100 shadow text-center border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h1>🛡️</h1>

                <h4>Safe Ride</h4>

                <p className="text-muted">
                  Verified drivers with secure and comfortable journeys.
                </p>

              </div>
            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div
              className="card h-100 shadow text-center border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h1>⚡</h1>

                <h4>Fast Booking</h4>

                <p className="text-muted">
                  Book your cab instantly in just a few seconds.
                </p>

              </div>
            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div
              className="card h-100 shadow text-center border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h1>💰</h1>

                <h4>Affordable</h4>

                <p className="text-muted">
                  Transparent pricing with no hidden charges.
                </p>

              </div>
            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div
              className="card h-100 shadow text-center border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h1>📞</h1>

                <h4>24 × 7 Support</h4>

                <p className="text-muted">
                  Customer support available whenever you need help.
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer
        className="text-center text-white py-4"
        style={{
          background: "#212529",
        }}
      >
        <h5 className="mb-2">
          🚖 UCAB Booking System
        </h5>

        <p className="mb-0">
          © 2026 All Rights Reserved | Fast • Safe • Affordable
        </p>

      </footer>

    </div>
  );
}

export default Home;