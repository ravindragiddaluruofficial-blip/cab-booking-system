import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import taxi from "../assets/taxi.png";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
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

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/users/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/uhome");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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
                maxHeight: "420px",
              }}
            />

            <h2 className="text-white fw-bold mt-4">
              Welcome to UCAB
            </h2>

            <p className="text-light">
              Fast • Safe • Affordable
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
                    User Login
                  </h2>

                  <p className="text-muted">
                    Login to continue your journey.
                  </p>

                </div>

                <form onSubmit={login}>

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
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
                    {loading ? "Logging in..." : "Login"}
                  </button>

                </form>

                <hr />

                <p className="text-center mb-0">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="fw-bold text-decoration-none"
                  >
                    Register Here
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

export default Login;