import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function ViewUser() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load user");
    }
  };

  if (!user) {
    return (
      <>
        <Anav />
        <div className="container py-5 text-center">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Anav />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "90vh",
          background: "#f8f9fa",
        }}
      >
        <div className="container">

          <div
            className="card shadow border-0"
            style={{ borderRadius: "20px" }}
          >
            <div className="card-body p-5">

              <h2 className="text-warning fw-bold mb-4">
                User Details
              </h2>

              <table className="table table-bordered">

                <tbody>

                  <tr>
                    <th width="220">Name</th>
                    <td>{user.name}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>

                  <tr>
                    <th>Phone</th>
                    <td>{user.phone}</td>
                  </tr>

                  <tr>
                    <th>Address</th>
                    <td>{user.address}</td>
                  </tr>

                  <tr>
                    <th>User ID</th>
                    <td>{user._id}</td>
                  </tr>

                </tbody>

              </table>

              <Link
                to="/admin/users"
                className="btn btn-warning"
              >
                Back
              </Link>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ViewUser;