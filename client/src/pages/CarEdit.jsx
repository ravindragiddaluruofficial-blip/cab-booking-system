import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function CarEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({
    carName: "",
    model: "",
    category: "",
    seats: "",
    price: "",
    driverName: "",
    vehicleNumber: "",
    status: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    try {
      const res = await API.get(`/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load car");
    }
  };

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateCar = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(car).forEach((key) => {
        if (key !== "image") {
          formData.append(key, car[key]);
        }
      });

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car Updated Successfully");

      navigate("/admin/cars");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Anav />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Edit Car
          </h2>

          <form onSubmit={updateCar}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Car Name</label>

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
                <label>Model</label>

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
                <label>Category</label>

                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={car.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Seats</label>

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
                <label>Price Per KM</label>

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
                <label>Driver Name</label>

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
                <label>Vehicle Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="vehicleNumber"
                  value={car.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Current Image */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Current Image
                </label>

                <br />

                {car.image && (
                  <img
                    src={`http://localhost:8000/${car.image}`}
                    alt="Car"
                    style={{
                      width: "180px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}

              </div>

              {/* Upload New Image */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Change Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImage}
                />

              </div>

              <div className="col-md-6 mb-4">

                <label>Status</label>

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
              Update Car
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

export default CarEdit;