const jwt = require("jsonwebtoken");
const { userModel } = require("../models/User.model");
require("dotenv").config();

const authorization = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.privateKey, async function (err, decoded) {
    if (err) {
      res.send({ Error: "Something error" });
    } else {
        const user = await userModel.findOne({ _id: decoded.userId });
        req.body.userId = decoded.userId;
        if(user.role === "admin"){
            next();
        }
      else{
        res.status(401).send({message: "Not Authorized"})
      }
    }
  });
};

module.exports = {
  authorization,
};
