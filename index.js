const express = require("express");
const cors = require("cors");
const mongo = require("./db");
const {
  adminSignup,
  adminSignin,
  get,
  addNewStaff,
  viewStaff,
  modifyStaff,
  countStaff,
  adminChangePassword,
} = require("./modules/adminModule");
const {
  StaffLogin,
  del,
  addStudent,
  studentChangePassword,
  viewStudent,
  delStudent,markAttendance,viewAttendance, getLeaveApplication
} = require("./modules/staffModule");
const { Authentication } = require("./modules/authorize");
const { studentLogin, applyLeave } = require("./modules/studentModule");

const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();

//admin
app.post("/adminlogin", adminSignin);
app.post("/adminsignup", adminSignup);
app.put("/adminchangepsw", adminChangePassword);

//add staff
app.get("/countstaff", countStaff);
app.post("/addstaff", addNewStaff);
app.get("/viewstaff", viewStaff);

// staff login
app.get("/getstaff", async (req, res, next) => {
  let data = await mongo.db.collection("staff").find().toArray();
  res.send(data);
});
app.post("/stafflogin", StaffLogin);
app.post("/addstudent", addStudent);
app.put("/staffchangepsw", studentChangePassword);
app.get("/viewstudent", viewStudent);
app.post('/markattendance',markAttendance)
app.get('/viewattendance',viewAttendance)
app.get('/viewleave',getLeaveApplication)
app.delete("/delete", delStudent);

//student Login
app.post('/studentlogin',studentLogin)
app.post('/applyleave',applyLeave)
app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});
