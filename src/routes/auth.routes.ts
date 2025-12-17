import express from "express";
import { userModel } from "../models/user.js";
import { adminModel } from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

AuthRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Required Fields should not be empty",
    });
  }
  try {
    const admin = await adminModel.findOne({
      email,
    });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Password not correct",
      });
    }
    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "login sucessfull",
      token,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});
