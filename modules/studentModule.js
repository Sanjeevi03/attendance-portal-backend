const mongo = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");


module.exports.get =
  // --- STUDENT LOGIN
  module.exports.studentLogin = async (req, res, next) => {
    const existUser = await mongo.db
      .collection("student")
      .findOne({ regno: req.body.regno });
    if (!existUser)
      return res.status(400).send({ msg: "Register Id is not Correct" });

    const isValid = await bcrypt.compare(req.body.studentpassword, existUser.studentpassword);

    if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

    //Generate token
    const token = jwt.sign(existUser, "attendance", { expiresIn: "5hr" });
    res.send(token);
  };

  // APPLY LEAVE
  module.exports.applyLeave = async (req, res, next) => {
   const data = mongo.db.collection('leave').insertOne(req.body)
   res.send(data);
 };