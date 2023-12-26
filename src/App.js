import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import PaymentOpts from "./pages/paymentOptions/PaymentOpts";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Profile from "./pages/profile/Profile";
import Reviews from "./pages/revies/Reviews";
import AdminRegister from "./pages/admin-register/AdminRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/private-routing/PrivateRoute";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { getUserInfo } from "./redux/auth/UserAction";
import { persistStore, persistReducer } from "redux-persist";

function App() {
  const dispatch = useDispatch();
  //to check if user is logged in or not and
  //if not redirect to login page else
  // redirect to dashboard page
  onAuthStateChanged(auth, (user) => {
    if (user?.uid) {
      dispatch(getUserInfo(user.uid));
    }
  });
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forget-passeord" element={<ForgetPassword />} />
        {/* private routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-options"
          element={
            <PrivateRoute>
              <PaymentOpts />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
