import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Unav from "../components/Unav";

function Cabs() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Unav />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(to right,#FFF8E1,#FFE082)",
        }}
      >
        <div className="container">

          {/* Heading */}

          <div className="text-center mb-5">

            <h1 className="display-5 fw-bold text-warning">
              🚖 Available Cabs
            </h1>

            <p className="lead text-muted">
              Choose your preferred cab and enjoy a safe, comfortable ride.
            </p>

          </div>

          <div className="row">

            {cars.length > 0 ? (
              cars.map((car) => (

                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={car._id}
                >

                  <div
                    className="card border-0 shadow-lg h-100"
                    style={{
                      borderRadius: "22px",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform =
                        "translateY(-8px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform =
                        "translateY(0px)")
                    }
                  >

                    <div className="position-relative">

                     <img
  src={
    car.image
      ? `http://localhost:8000/${car.image}`
      : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900"
  }
  alt={car.carName}
  className="card-img-top"
  style={{
    height: "230px",
    objectFit: "cover",
    borderTopLeftRadius: "22px",
    borderTopRightRadius: "22px",
  }}
/>

                      <span
                        className="badge bg-success position-absolute"
                        style={{
                          top: "15px",
                          right: "15px",
                          fontSize: "14px",
                        }}
                      >
                        Available
                      </span>

                    </div>

                    <div className="card-body">

                      <div className="d-flex justify-content-between">

                        <h4 className="fw-bold text-warning">
                          {car.carName}
                        </h4>

                        <span className="fw-bold text-success">
                          ⭐ 4.9
                        </span>

                      </div>

                      <small className="text-muted">
                        {car.category}
                      </small>

                      <hr />

                      <div className="row">

                        <div className="col-6">
                          <p className="mb-2">
                            🚘 <b>Model</b>
                          </p>

                          <small>{car.model}</small>
                        </div>

                        <div className="col-6">
                          <p className="mb-2">
                            👥 <b>Seats</b>
                          </p>

                          <small>{car.seats}</small>
                        </div>

                      </div>

                      <div className="mt-3">

                        <p className="mb-2">
                          👨‍✈️ <b>Driver:</b>{" "}
                          {car.driverName}
                        </p>

                        <p className="mb-2">
                          🚗 <b>Vehicle:</b>{" "}
                          {car.vehicleNumber}
                        </p>

                      </div>

                      <div className="mt-3">

                        <span className="badge bg-primary me-2">
                          ❄ AC
                        </span>

                        <span className="badge bg-secondary me-2">
                          📍 GPS
                        </span>

                        <span className="badge bg-dark">
                          🎵 Music
                        </span>

                      </div>

                    </div>

                    <div className="card-footer bg-white border-0">

                      <div className="d-flex justify-content-between align-items-center mb-3">

                        <div>

                          <h3 className="text-success fw-bold mb-0">
                            ₹{car.price}
                          </h3>

                          <small className="text-muted">
                            Per Kilometer
                          </small>

                        </div>

                        <span className="badge bg-warning text-dark p-2">
                          Premium
                        </span>

                      </div>

                      <Link
                        to={`/bookcab/${car._id}`}
                        className="btn btn-warning btn-lg w-100 fw-bold"
                      >
                        🚕 Book Now
                      </Link>

                    </div>

                  </div>

                </div>

              ))
            ) : (
              <div className="text-center py-5">

                <h3>No Cabs Available</h3>

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default Cabs;