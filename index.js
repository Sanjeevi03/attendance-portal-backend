const express = require("express");
const cors = require("cors");
const mongo = require("./db");
const {
  adminSignup,
  adminSignin,
  get,
  addNewStaff,
  viewStaff,modifyStaff,countStaff
} = require("./modules/adminModule");
const { Authentication } = require("./modules/authorize");
const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();

//admin
app.post("/adminlogin", adminSignin);
app.post("/adminsignup", adminSignup);

//add staff
app.get('/countstaff',countStaff)
app.post("/addstaff", addNewStaff);
app.get("/viewstaff", viewStaff);
app.get("/modifystaff", modifyStaff);
app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});
