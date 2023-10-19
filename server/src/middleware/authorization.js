import jwt from "jsonwebtoken";
import "dotenv/config";

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  const token = authHeader.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.key);
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  req.user = payload;
  next();
}

export default verifyToken;
