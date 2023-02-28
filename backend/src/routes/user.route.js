const { Router } = require("express");
const { userModel } = require("../models/User.model");

const {
  signupUser,
  signinUser,
  forgotPassword,
  resetPassword,
  getUsers,
  getMyDetails,
  updateUser,
  searchUsers,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const userRoutes = Router();

userRoutes.get("/users", authorization, getUsers);

userRoutes.get("/users/:id", authentication, getMyDetails);

userRoutes.post("/signup", signupUser);

userRoutes.post("/signin", signinUser);

userRoutes.patch("/edit/:userId", updateUser);

// userRoutes.patch()

userRoutes.post("/forgotpassword", forgotPassword);

userRoutes.put("/resetpassword/:resetToken", resetPassword);

userRoutes.get("/search", authorization, searchUsers);

module.exports = {
  userRoutes,
};
