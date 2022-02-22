const jwt = require("jsonwebtoken");

exports.Authentication = async (req, res, next) => {
  //checking token is there or not
  if (!req.headers["access-token"])
    return res.status(400).send({ msg: "Token Not Found" });
  //verify token
  try {
   req.body.user = await jwt.verify(req.headers["access-token"], "attendance");
     next();
  } catch (err) {
    res.send("Unauthorised");
  }
};