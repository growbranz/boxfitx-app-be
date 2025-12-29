import express from "express";
import { userModel } from "../models/user.js";
import { adminModel } from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_ADMIN_PASSWORD } from "../config/config.js";
export const AuthRouter = express.Router();
AuthRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      Message: "Required Fields should not be empty",
    });
  }
  try {
    const existingAdmin = await adminModel.findOne({
      email,
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const Login = await adminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup sucessfull",
      Login,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  /* ---------- ADMIN LOGIN ---------- */
  const admin = await adminModel.findOne({ email });
  if (admin) {
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      JWT_ADMIN_PASSWORD,
      { expiresIn: "7d" }
    );

    return res.json({
      role: "admin",
      token,
    });
  }

  /* ---------- MEMBER LOGIN ---------- */
  const user = await userModel.findOne({ email }).populate("member");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: "member",
      memberId: user.member,
    },
    JWT_ADMIN_PASSWORD,
    { expiresIn: "7d" }
  );

  res.json({
    role: "member",
    token,
    memberId: user.member,
  });
});
