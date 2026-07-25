import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import taxi from "../assets/taxi.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/users/register", form);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#FFD54F,#FFC107,#212529)",
      }}
    >
      <div className="container">

        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >

          {/* Left Side */}

          <div className="col-lg-6 d-none d-lg-block text-center">

            <img
              src={taxi}
              alt="Taxi"
              className="img-fluid taxi-image"
              style={{
                maxHeight: "430px",
              }}
            />

            <h2 className="text-white fw-bold mt-4">
              Join UCAB Today
            </h2>

            <p className="text-light">
              Safe • Comfortable • Affordable
            </p>

          </div>

          {/* Right Side */}

          <div className="col-lg-5 col-md-8">

            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "25px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >

              <div className="card-body p-5">

                <div className="text-center mb-4">

                  <h2 className="fw-bold text-warning">
                    Create Account
                  </h2>

                  <p className="text-muted">
                    Register to start booking your rides.
                  </p>

                </div>

                <form onSubmit={register}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      className="form-control form-control-lg"
                      name="name"
                      placeholder="Enter Full Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Enter Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      className="form-control form-control-lg"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Address
                    </label>

                    <input
                      className="form-control form-control-lg"
                      name="address"
                      placeholder="Enter Address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        name="password"
                        placeholder="Create Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>

                    </div>

                  </div>

                  <button
                    className="btn btn-warning btn-lg w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Account..."
                      : "Register"}
                  </button>

                </form>

                <hr />

                <p className="text-center mb-0">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="fw-bold text-decoration-none"
                  >
                    Login Here
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;