import express from "express";
import users from "../resources/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const account = users.find((acc) => acc.username === username);
  if (!account) {
    return res.status(401).json({ msg: "Account not found" });
  } else {
    if (await bcrypt.compare(password, account.password)) {
      const user = { name: account.username, role: account.role };
      const token = jwt.sign(user, process.env.key);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ msg: "Login failed" });
    }
  }
});

export default router;
