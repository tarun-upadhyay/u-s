const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
 
  try {
   const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userEmail: tokenPayload.userEmail };
    next();
  } catch (error) {
    console.log(error)
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authentication;
