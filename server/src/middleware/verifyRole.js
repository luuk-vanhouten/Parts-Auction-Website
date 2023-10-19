import jwt from "jsonwebtoken";

function verifyRole(...roles) {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("No token provided");
      const payload = jwt.verify(token, process.env.key);
      const role = payload.role;
      if (!roles.includes(role)) throw new Error("You don't have permission");
      next();
    } catch (err) {
      return res.status(401).json({ msg: err.message });
    }
  };
}

export default verifyRole;
