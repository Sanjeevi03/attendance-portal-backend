const express = require('express');
const cors = require('cors');
const mongo = require('./db')
const {adminSignup,adminSignin,get} = require('./modules/adminModule')
const {Authentication} = require('./modules/authorize')
const app = express()
app.use(cors())
app.use(express.json())


mongo.connect()

//admin
app.post('/adminlogin',adminSignin)
app.post('/adminsignup',adminSignup)


app.listen(process.env.PORT || 8000,()=>{
   console.log("Server Started : 8000");
})