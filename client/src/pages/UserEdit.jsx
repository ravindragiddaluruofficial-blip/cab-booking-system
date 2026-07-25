import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load user");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/users/${id}`, user);

      alert("User Updated Successfully");

      navigate("/admin/users");

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

          <h3 className="mb-4">
            Edit User
          </h3>

          <form onSubmit={updateUser}>

            <input
              type="text"
              className="form-control mb-3"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <input
              type="email"
              className="form-control mb-3"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <input
              type="text"
              className="form-control mb-4"
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Update User
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/users")}
            >
              Back
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default UserEdit;