const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/User.model");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/Token.model");

const emailValidator =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//Sign Up User
const signupUser = async (req, res) => {
  let { name, email, password } = req.body;

  // check the correct email type
  if (!emailValidator.test(email)) {
    res.status(401).send({ error: "Check your email" });
  }

  try {
    let user = await userModel.findOne({ email: email });
    //already registered user
    if (user) {
      return res
        .status(401)
        .send({ error: "Already Registered, Please Login" });
    } else {
      // hash the password and save user
      bcrypt.hash(password, 6, async function (err, hash) {
        if (err) {
          res.status(401).send({ error: "Something wrong" });
          console.log(err);
        } else {
          const newUser = new userModel({
            name,
            email,
            password: hash,
          });
          await newUser.save();
          var token = jwt.sign({ userId: newUser._id }, process.env.privateKey);

          res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
          });

          res
            .status(200)
            .send({ message: "Succesfully Registered", user: newUser, token });
        }
      });
    }
  } catch (err) {
    return res.status(401).send({error: err.message});
  }
};

//Sign In User
const signinUser = async (req, res) => {
  let { email, password } = req.body;

  //find the user
  let user = await userModel.findOne({ email });
  if (user) {
    let hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (user && result) {
        var token = jwt.sign({ userId: user._id }, process.env.privateKey);
        res.cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: "none",
          secure: true,
        });
        res.send({
          message: "Login Successful",
          token,
          user,
        });
      } else if (err) {
        res.status(401).send({ error: "Something went wrong" });
      } else {
        res.status(401).send({ error: "Wrong username or password" });
      }
    });
  } else {
    res.status(401).send({ error: "Wrong username or password" });
  }
};

//Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    console.log(email);
    res.status(401).send({ error: "User does not exist, Please Sign up" });
  } else {
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (Date.parse(token?.createdAt) + 24 * 60 * (60 * 1000) > Date.now()) {
      let hours = Math.floor(
        (Date.parse(token?.createdAt) + 24 * 60 * (60 * 1000) - Date.now()) /
          (60 * 60 * 1000)
      );
      let minutes = Math.ceil(
        (Date.parse(token?.createdAt) + 24 * 60 * (60 * 1000) - Date.now()) /
          (60 * 1000) -
          hours * 60
      );
      res.status(401).send({error: `Try after ${hours} hrs and ${minutes} mins`});
    } else {
      if (token) {
        await token.deleteOne();
      }

      // Create Reste Token
      let resetToken = Date.parse("2023-02-28T15:32:36.995+00:00") + user._id;

      // Save Token to DB
      await new Token({
        userId: user._id,
        token: resetToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 10 * (60 * 1000), // Ten minutes
      }).save();

      // Construct Reset Url
      const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

      // Reset Email
      const message = `
            <h2>Hello ${user.name}</h2>
            <p>Please use the url below to reset your password</p>  
            <p>This reset link is valid for only 10 minutes.</p>
      
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      
            <p>Regards...</p>
            <p>Es Magico Team</p>
          `;
      const subject = "Password Reset Request";
      const send_to = user.email;
      const sent_from = process.env.EMAIL_USER;

      try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).send({ success: true, message: "Reset Email Sent" });
      } catch (error) {
        console.log(email);
        res.status(401).send({ error: "Email not sent, please try again" });
      }
    }
  }
};

//Reset Password
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Find Token in DB
  const userToken = await Token.findOne({
    token: resetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(401).send({ error: "Invalid or Expired Token" });
  } else {
    // Find user
    const user = await userModel.findOne({ _id: userToken.userId });
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res.status(401).send({ error: "Something wrong" });
        console.log(err);
      } else {
        user.password = hash;
        await user.save();
        res.status(200).send({
          message: "Password Reset Successful, Please Login",
        });
      }
    });
  }
};

// Logout User
const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).send({ message: "Successfully Logged Out" });
};

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).send(users);
};

const getMyDetails = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({ _id: id });
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    req.body
  );
  if (updatedUser) {
    res.status(200).send(updatedUser);
  } else {
    res.status(401).send({error: "couldn't update"});
  }
};

const searchUsers = async (req, res) => {
  let keyword = {};
  if (req.query.q) {
    keyword = req.query.q;
  }

  try {
    const user = await userModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    });
    return res.status(200).send(user);
  } catch (er) {
    return res.status(401).send({error: er.message});
  }
};

module.exports = {
  signupUser,
  signinUser,
  forgotPassword,
  resetPassword,
  logout,
  getUsers,
  getMyDetails,
  updateUser,
  searchUsers,
};
