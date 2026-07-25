import { Link, useNavigate } from "react-router-dom";

function Unav() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-warning fs-3"
          to="/uhome"
        >
          🚖 UCAB
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/uhome"
              >
                🏠 Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/cabs"
              >
                🚖 Cabs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/mybookings"
              >
                📖 My Bookings
              </Link>
            </li>

            <li className="nav-item mx-3">
              <span className="badge bg-warning text-dark fs-6">
                👤 {user?.name}
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

export default Unav;