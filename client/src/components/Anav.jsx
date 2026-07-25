import { Link, useNavigate } from "react-router-dom";

function Anav() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-warning fs-3"
          to="/admin/home"
        >
          👨‍💼 UCAB Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/admin/home"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/admin/users"
              >
                👥 Users
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/admin/cars"
              >
                🚖 Cars
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/admin/addcar"
              >
                ➕ Add Car
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/admin/bookings"
              >
                📖 Bookings
              </Link>
            </li>

            <li className="nav-item mx-3">
              <span className="badge bg-warning text-dark fs-6">
                👨‍💼 {admin?.name}
              </span>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Anav;