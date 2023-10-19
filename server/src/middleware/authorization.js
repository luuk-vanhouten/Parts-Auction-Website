import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.key);
    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "You dont have the correct permissions!" });
  }
}

export default verifyToken;
