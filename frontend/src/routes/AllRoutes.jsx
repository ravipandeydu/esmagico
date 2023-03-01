import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import PrivateRoute from "../components/PrivateRoute";
import ResetPassword from "../components/ResetPassword";
import Users from "../components/Users";
import Home from "../pages/Home";
import MyProfile from "../pages/MyProfile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/myprofile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/resetpassword/:resettoken" element={<ResetPassword />} />
    </Routes>
  );
};

export default AllRoutes;
