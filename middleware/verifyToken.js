const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1].trim(); // Extract Bearer token
  console.log('Requested token:', token);
  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }
  jwt.verify(token, "your-top-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;