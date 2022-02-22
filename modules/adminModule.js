const mongo = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// --- GET
module.exports.get = async (req,res,next)=>{
   let data = await mongo.db.collection('users').find().toArray()
   res.send(data)
}

// --- ADMIN SIGNUP
module.exports.adminSignup = async (req, res, next) => {
  const existUser = await mongo.db.collection("users").findOne({ username: req.body.username });
  if (existUser) {
    return res.status(400).send({ msg: "This Admin already exists" });
  } else {
    //encrypt
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    var data = await mongo.db.collection("users").insertOne(req.body);
    return res.send(data);
  }
};

// --- ADMIN LOGIN
module.exports.adminSignin = async (req, res, next) => {
  const existUser = await mongo.db.collection("users").findOne({ name: req.body.name });
  if (!existUser)
    return res.status(400).send({ msg: "Username is not Correct" });

  const isValid = await bcrypt.compare(req.body.password, existUser.password);

  if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

  //Generate token
  const token = jwt.sign(existUser, "attendance", { expiresIn: "5hr" });
  res.send(token);
};
