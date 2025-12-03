import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// ADMIN REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashed });
    await admin.save();

    // Return the user data along with id
    res.json({ message: "Admin registered successfully", user: { id: admin._id, email } });
  } catch (err) {
    console.error("Admin register error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  console.log("Admin login route hit"); // <-- This helps debug if route is reached
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return user info along with token and role for frontend
    res.json({
      message: "Login success",
      token,
      user: { id: admin._id, email: admin.email, role: "ADMIN" }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
