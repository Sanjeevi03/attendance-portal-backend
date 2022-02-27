const express = require("express");
const cors = require("cors");
const mongo = require("./db");
const {
  adminSignup,
  adminSignin,
  addNewStaff,
  viewStaff,
  countStaff,
  adminChangePassword,
  countStudent,
} = require("./modules/adminModule");
const {
  StaffLogin,
  del,
  addStudent,
  staffChangePassword,
  viewStudent,
  delStudent,markAttendance,viewAttendance, getLeaveApplication
} = require("./modules/staffModule");
const { Authentication } = require("./modules/authorize");
const { studentLogin, applyLeave, studentChangePassword, myAttendance } = require("./modules/studentModule");

const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();

//admin
app.post("/adminlogin", adminSignin);
app.post("/adminsignup", adminSignup);
app.put("/adminchangepsw", adminChangePassword);
app.get("/countstaff", countStaff);
app.get('/countstudent',countStudent)
app.post("/addstaff", addNewStaff);
app.get("/viewstaff", viewStaff);
// staff login
app.post("/stafflogin", StaffLogin);
app.post("/addstudent", addStudent);
app.put("/staffchangepsw", staffChangePassword);
app.get("/viewstudent", viewStudent);
app.post('/markattendance',markAttendance)
app.get('/viewattendance',viewAttendance)
app.get('/viewleave',getLeaveApplication)
app.delete("/delete", delStudent);

//student Login
app.post('/studentlogin',studentLogin)
app.post('/applyleave',applyLeave)
app.put('/studentchangepsw',studentChangePassword)
app.get('/myattendance',myAttendance)
app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});
