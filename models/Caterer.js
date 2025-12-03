import mongoose from "mongoose";

const catererSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    personName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "CATERER" }
  },
  { timestamps: true }
);

export default mongoose.model("Caterer", catererSchema);
