import jwt from "jsonwebtoken";

function verifyRole(...roles) {
  return (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ msg: "No token provided" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    try {
      const token = authorization.split(" ")[1];
      const { role } = jwt.verify(token, process.env.key);

      return roles.includes(role)
        ? next()
        : res.status(403).json({ msg: "You don't have permissions!" });
    } catch (error) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
}

export default verifyRole;
