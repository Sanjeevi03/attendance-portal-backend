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

 //CHANGE PASSWORD
module.exports.studentChangePassword = async(req,res,next)=>{
  const existUser = await mongo.db.collection("student").findOne({regno:req.body.regno});
  const isValid = await bcrypt.compare(req.body.old, existUser.studentpassword);
  
  if(isValid)
  {
    const salt1 = await bcrypt.genSalt(5);
    const newPassword  = await bcrypt.hash(req.body.new, salt1);
  var data = await mongo.db.collection("student").updateOne({regno:req.body.regno},{$set:{studentpassword:newPassword}});
  return res.send(data)
  }
  else{
  res.send({msg:"Old Password is Incorrect"})
  }
}

// VIEW ATTENDANCE
module.exports.myAttendance = async(req,res,next) =>{
  const data = await mongo.db.collection('attendance-note').find({regno:req.headers.regno}).toArray()
  res.send(data)
}