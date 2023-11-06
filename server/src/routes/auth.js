import express from "express";
import users from "../resources/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const account = users.find((acc) => acc.username === username);

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const user = { name: account.username, role: account.role };
  const token = jwt.sign(user, process.env.key);
  return res.status(200).json({ msg: "Login successful!", token });
});

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ msg: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword, role: "user" };
  users.push(newUser);
  return res.status(201).json({ msg: "Account created" });
});

export default router;
