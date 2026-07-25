import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function ARegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/admin/register", form);

      alert("Admin Registered Successfully");

      navigate("/admin/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow-lg p-4 mx-auto"
        style={{ maxWidth: "500px", borderRadius: "15px" }}
      >

        <h2 className="text-center text-success mb-4">
          Admin Registration
        </h2>

        <form onSubmit={registerAdmin}>

          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <hr />

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/admin/login">
            Login Here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ARegister;