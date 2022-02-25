const express = require("express");
const cors = require("cors");
const mongo = require("./db");
const {
  adminSignup,
  adminSignin,
  get,
  addNewStaff,
  viewStaff,modifyStaff,countStaff,adminChangePassword
} = require("./modules/adminModule");
const { Authentication } = require("./modules/authorize");
const {StaffLogin,del,addStudent,studentChangePassword} = require('./modules/staffModule')
const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();

//admin
app.post("/adminlogin", adminSignin);
app.post("/adminsignup", adminSignup);
app.put('/adminchangepsw',adminChangePassword)

//add staff
app.get('/countstaff',countStaff)
app.post("/addstaff", addNewStaff);
app.get("/viewstaff", viewStaff);


// staff login
app.get('/getstaff',async (req, res, next) => {
  let data = await mongo.db.collection("staff").find().toArray();
  res.send(data);
})
app.post('/stafflogin',StaffLogin)
app.post('/addstudent',addStudent)
app.put('/staffchangepsw',studentChangePassword)

app.delete('/del',del)
app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});
