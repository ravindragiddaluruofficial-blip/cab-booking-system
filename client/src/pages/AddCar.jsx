import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function AddCar() {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    carName: "",
    model: "",
    category: "",
    seats: "",
    price: "",
    driverName: "",
    vehicleNumber: "",
    status: "Available",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const addCar = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(car).forEach((key) => {
        formData.append(key, car[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await API.post("/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car Added Successfully");

      navigate("/admin/cars");
    } catch (err) {
      console.log(err);
      alert("Failed to Add Car");
    }
  };

  return (
    <>
      <Anav />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Add New Car
          </h2>

          <form onSubmit={addCar}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Car Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="carName"
                  value={car.carName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Model</label>

                <input
                  type="text"
                  className="form-control"
                  name="model"
                  value={car.model}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>

                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="SUV / Sedan / Hatchback"
                  value={car.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Seats</label>

                <input
                  type="number"
                  className="form-control"
                  name="seats"
                  value={car.seats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Price Per KM (₹)
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={car.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Driver Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="driverName"
                  value={car.driverName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="vehicleNumber"
                  value={car.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image Upload */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Car Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImage}
                  required
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={car.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Add Car
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/cars")}
            >
              Cancel
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddCar;