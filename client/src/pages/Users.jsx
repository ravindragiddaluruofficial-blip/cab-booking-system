import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Anav from "../components/Anav";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  // Load Users
  const getUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      alert("User Deleted Successfully");
      getUsers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // Search Filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.phone || "").includes(search)
  );

  return (
    <>
      <Anav />

      <div className="container mt-4">

        <h2 className="text-center mb-4">
          Manage Users
        </h2>

        <div className="row mb-3">
          <div className="col-md-4 ms-auto">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th width="260">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>

                  <td>{index + 1}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <Link
                      to={`/admin/userview/${user._id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      View
                    </Link>

                    <Link
                      to={`/admin/useredit/${user._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Users Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Users;