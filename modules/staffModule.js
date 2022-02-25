const mongo = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- GET
module.exports.get =
  // --- STAFF LOGIN
  module.exports.StaffLogin = async (req, res, next) => {
    const existUser = await mongo.db
      .collection("staff")
      .findOne({ staffid: req.body.staffid });
    if (!existUser)
      return res.status(400).send({ msg: "Staff Id is not Correct" });

    const isValid = await bcrypt.compare(req.body.staffpassword, existUser.staffpassword);

    if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

    //Generate token
    const token = jwt.sign(existUser, "attendance", { expiresIn: "5hr" });
    res.send(token);
  };

// ADD NEW STUDENT
module.exports.addStudent = async (req, res, next) => {
   const existUser = await mongo.db.collection("student").findOne({regno:req.body.regno});
   if (existUser) {
     return res.status(400).send({ msg: "Register No already exists" });
   } else {
     //encrypt
     const salt = await bcrypt.genSalt(5);
     req.body.studentpassword = await bcrypt.hash(req.body.studentpassword, salt);
 
     var data = await mongo.db.collection("student").insertOne(req.body);
     return res.send(data);
   }
 };
 
//CHANGE PASSWORD
module.exports.studentChangePassword = async(req,res,next)=>{
  const existUser = await mongo.db.collection("staff").findOne({staffid:req.body.staffid});
  console.log("User",existUser);
  const isValid = await bcrypt.compare(req.body.old, existUser.staffpassword);
  
  if(isValid)
  {
    const salt1 = await bcrypt.genSalt(5);
    const newPassword  = await bcrypt.hash(req.body.new, salt1);
  var data = await mongo.db.collection("staff").updateOne({staffid:req.body.staffid},{$set:{staffpassword:newPassword}});
  return res.send(data)
  }
  else{
  res.send({msg:"Old Password is Incorrect"})
  }


}

//  DELETE 
module.exports.del = async (req, res, next) => {
     const data = await mongo.db.collection("staff").remove({})
     res.send(data);
   };
   