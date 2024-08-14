const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  console.log("tokennnnn", token);
  if (!token) {
    console.log("no token");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
