import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Uhome from "./pages/Uhome";
import Cabs from "./pages/Cabs";
import BookCab from "./pages/BookCab";
import MyBookings from "./pages/MyBookings";
import EditBooking from "./pages/EditBooking";

// Admin Pages
import ALogin from "./pages/ALogin";
import ARegister from "./pages/ARegister";
import AHome from "./pages/AHome";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import UserView from "./pages/UserView";   // <-- NEW
import Acabs from "./pages/Acabs";
import AddCar from "./pages/AddCar";
import CarEdit from "./pages/CarEdit";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route path="/uhome" element={<Uhome />} />
      <Route path="/cabs" element={<Cabs />} />
      <Route path="/bookcab/:id" element={<BookCab />} />
      <Route path="/mybookings" element={<MyBookings />} />
      <Route path="/editbooking/:id" element={<EditBooking />} />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<ALogin />} />
      <Route path="/admin/register" element={<ARegister />} />
      <Route path="/admin/home" element={<AHome />} />

      {/* User Management */}
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/useredit/:id" element={<UserEdit />} />
      <Route path="/admin/userview/:id" element={<UserView />} />

      {/* Car Management */}
      <Route path="/admin/cars" element={<Acabs />} />
      <Route path="/admin/addcar" element={<AddCar />} />
      <Route path="/admin/caredit/:id" element={<CarEdit />} />

      {/* Booking Management */}
      <Route path="/admin/bookings" element={<Bookings />} />

    </Routes>
  );
}

export default App;