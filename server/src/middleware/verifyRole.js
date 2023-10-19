import jwt from "jsonwebtoken";

function verifyRole(...roles) {
  return function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: "No token provided" });
    }
    if (!req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.key);
    const role = payload.role;
    if (roles.includes(role)) {
      next();
    } else {
      return res.status(401).json({ msg: "You dont have perms!" });
    }
  };
}

export default verifyRole;
