const mongo = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- GET
module.exports.get = async (req, res, next) => {
  let data = await mongo.db.collection("users").find().toArray();
  res.send(data);
};

// --- ADMIN SIGNUP
module.exports.adminSignup = async (req, res, next) => {
  const existUser = await mongo.db
    .collection("users")
    .findOne({ username: req.body.username });
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
  const existUser = await mongo.db
    .collection("users")
    .findOne({ name: req.body.name });
  if (!existUser)
    return res.status(400).send({ msg: "Username is not Correct" });

  const isValid = await bcrypt.compare(req.body.password, existUser.password);

  if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

  //Generate token
  const token = jwt.sign(existUser, "attendance", { expiresIn: "5hr" });
  res.send(token);
};

//CHANGE PASSWORD
module.exports.adminChangePassword = async(req,res,next)=>{
  const existUser = await mongo.db.collection("users").findOne({username:req.body.username});
  console.log("User",existUser);
  const isValid = await bcrypt.compare(req.body.old, existUser.password);
  
  if(isValid)
  {
    const salt1 = await bcrypt.genSalt(5);
    const newPassword  = await bcrypt.hash(req.body.new, salt1);
  var data = await mongo.db.collection("users").updateOne({username:req.body.username},{$set:{password:newPassword}});
  return res.send(data)
  }
  else{
  res.send({msg:"Old Password is Incorrect"})
  }


}


// ADDING NEW STAFF
module.exports.addNewStaff = async (req, res, next) => {
  const existUser = await mongo.db.collection("staff").findOne({staffid:req.body.staffid});
  if (existUser) {
    return res.status(400).send({ msg: "Staff ID already exists" });
  } else {
    //encrypt
    const salt = await bcrypt.genSalt(5);
    req.body.staffpassword = await bcrypt.hash(req.body.staffpassword, salt);

    var data = await mongo.db.collection("staff").insertOne(req.body);
    return res.send(data);
  }
};





// VIEW STAFF DETAILS
module.exports.viewStaff = async (req, res, next) => {
  const data = await mongo.db.collection("staff").find().toArray();
  res.send(data);
};


// MODIFY STAFF DETAILS
module.exports.modifyStaff = async (req, res, next) => {
  // const data = await mongo.db.collection("staff").findOne({staffid:req.body.staffid})
 
  // if(data)
  // {
 let data1 = await mongo.db.collection('table').updateOne({staffid:req.body.staffid},{$set:{staffname:'sanju'}},{new:true})
 res.send(data1)
  // }
  next();
};

// COUNTING STAFF
module.exports.countStaff = async (req, res, next) => {
  const data = await mongo.db.collection("staff").find().toArray()
  res.send(data);
};
