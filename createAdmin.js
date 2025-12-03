import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js"; // path tumhare project structure ke hisaab se sahi karo
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const createAdmin = async () => {
  const hashed = await bcrypt.hash("password", 10); // yahan tumhara password
  const admin = new Admin({ email: "admin@test.com", password: hashed });
  await admin.save();
  console.log("Admin created!");
  process.exit();
};

createAdmin();
