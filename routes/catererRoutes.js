import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Caterer from "../models/Caterer.js";

const router = express.Router();

// ---------------------------
// REGISTER CATERER
router.post("/register", async (req, res) => {
console.log("RECEIVED:", req.body);
try {
const { businessName, name, email, phone, businessDescription, password } = req.body;


// Required fields check
if (!businessName || !name || !email || !phone || !businessDescription || !password) {
  return res.status(400).json({ message: "All fields are required" });
}

// Check if email already exists
const existing = await Caterer.findOne({ email });
if (existing) {
  return res.status(400).json({ message: "Email already registered" });
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Create caterer
const newCaterer = new Caterer({
  businessName,
  personName: name,
  email,
  phone,
  description: businessDescription,
  password: hashedPassword,
});

await newCaterer.save();

res.status(201).json({
  message: "Caterer registered successfully",
  caterer: {
    id: newCaterer._id,
    businessName: newCaterer.businessName,
    personName: newCaterer.personName,
    email: newCaterer.email,
    phone: newCaterer.phone,
    description: newCaterer.description,
    role: newCaterer.role
  },
});

} catch (err) {
console.error("Caterer register error:", err);
res.status(500).json({ message: "Server error", error: err.message });
}
});

// ---------------------------
// LOGIN CATERER
router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;


// Check if caterer exists
const caterer = await Caterer.findOne({ email });
console.log("Found Caterer:", caterer);

if (!caterer) {
  return res.status(404).json({ message: "Caterer not found" });
}

// Compare password
const match = await bcrypt.compare(password, caterer.password);
if (!match) {
  return res.status(400).json({ message: "Wrong password" });
}

// Generate JWT token
const token = jwt.sign(
  { id: caterer._id, role: "CATERER" },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({
  message: "Login success",
  token,
  caterer: {
    id: caterer._id,
    businessName: caterer.businessName,
    personName: caterer.personName,
    email: caterer.email,
    phone: caterer.phone,
    description: caterer.description,
    role: caterer.role
  },
});


} catch (err) {
console.error("Caterer login error:", err);
res.status(500).json({ message: "Server error", error: err.message });
}
});

export default router;
