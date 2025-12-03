// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//     res.send("Backend is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

// import adminRoutes from "./routes/adminRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import catererRoutes from "./routes/catererRoutes.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/caterers", catererRoutes);

// // DB connect
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.error("Mongo Error:", err));

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import catererRoutes from "./routes/catererRoutes.js";
import menuRoutes from "./routes/menuRoutes.js"; // <-- new menu routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- for form data
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/caterers", catererRoutes);
app.use("/api/menu", menuRoutes); // <-- menu route

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
