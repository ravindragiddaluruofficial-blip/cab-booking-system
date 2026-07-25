import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function ALogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const loginAdmin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/admin/login", form);

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      localStorage.setItem("adminToken", res.data.token);

      alert("Admin Login Successful");

      setForm({
        email: "",
        password: "",
      });

      // Navigate to Admin Dashboard
      navigate("/admin/home");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4 mx-auto"
        style={{ maxWidth: "450px", borderRadius: "15px" }}
      >
        <h2 className="text-center text-primary mb-4">
          Admin Login
        </h2>

        <form onSubmit={loginAdmin}>
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

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
            <label className="form-label">
              Password
            </label>

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
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <p className="text-center mb-0">
          Don't have an Admin account?{" "}
          <Link to="/admin/register">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ALogin;