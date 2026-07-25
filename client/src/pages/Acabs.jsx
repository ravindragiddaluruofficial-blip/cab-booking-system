import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function Acabs() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCars();
  }, []);

  // Load Cars
  const getCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load cars");
    }
  };

  // Delete Car
  const deleteCar = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cars/${id}`);

      alert("Car Deleted Successfully");

      getCars();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // Search Filter
  const filteredCars = cars.filter((car) =>
    car.carName.toLowerCase().includes(search.toLowerCase()) ||
    car.model.toLowerCase().includes(search.toLowerCase()) ||
    car.category.toLowerCase().includes(search.toLowerCase()) ||
    car.driverName.toLowerCase().includes(search.toLowerCase()) ||
    car.vehicleNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Anav />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Manage Cars</h2>

          <Link
            to="/admin/addcar"
            className="btn btn-success"
          >
            + Add Car
          </Link>

        </div>

        {/* Search */}

        <div className="row mb-3">

          <div className="col-md-4 ms-auto">

            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        <table className="table table-bordered table-hover shadow align-middle">

          <thead className="table-dark">

            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Car</th>
              <th>Model</th>
              <th>Category</th>
              <th>Seats</th>
              <th>Price/KM</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <tr key={car._id}>

                  <td>{index + 1}</td>

                  {/* Car Image */}

                  <td>

                    <img
                      src={
                        car.image
                          ? `http://localhost:8000/${car.image}`
                          : "https://via.placeholder.com/70x50?text=No+Image"
                      }
                      alt={car.carName}
                      style={{
                        width: "70px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />

                  </td>

                  <td>{car.carName}</td>

                  <td>{car.model}</td>

                  <td>{car.category}</td>

                  <td>{car.seats}</td>

                  <td>₹{car.price}</td>

                  <td>{car.driverName}</td>

                  <td>

                    <span
                      className={`badge ${
                        car.status === "Available"
                          ? "bg-success"
                          : car.status === "Booked"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {car.status}
                    </span>

                  </td>

                  <td>

                    <Link
                      to={`/admin/caredit/${car._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCar(car._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="10"
                  className="text-center"
                >
                  No Cars Available
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Acabs;