// server.js — FINAL STABLE VERSION
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// --------------------------------------------
// 🔗 MongoDB Connection String
// --------------------------------------------
const MONGODB_URI = "mongodb://127.0.0.1:27017/servicecategories";

// --------------------------------------------
// 📌 Category Schema
// --------------------------------------------
const categorySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    providerCount: { type: Number, required: true, min: 0 },
    averagePrice: { type: String, required: true }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

// --------------------------------------------
// 🟢 Connect to MongoDB
// --------------------------------------------
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
}

// --------------------------------------------
// 🟡 Seed Default Categories (Runs Once)
// --------------------------------------------
async function migrateDefaults() {
  try {
    const count = await Category.countDocuments();
    if (count > 0) {
      console.log("ℹ️ Categories already exist.");
      return;
    }

    const defaults = [
      {
        id: uuidv4(),
        name: "Home Cleaning",
        icon: "HomeIcon",
        description: "Professional house cleaning services",
        providerCount: 1250,
        averagePrice: "$80-150"
      },
      {
        id: uuidv4(),
        name: "Plumbing",
        icon: "WrenchScrewdriverIcon",
        description: "Licensed plumbing experts",
        providerCount: 890,
        averagePrice: "$120-200"
      },
      {
        id: uuidv4(),
        name: "Electrical",
        icon: "BoltIcon",
        description: "Certified electricians for all electric needs",
        providerCount: 675,
        averagePrice: "$100-180"
      }
    ];

    await Category.insertMany(defaults);
    console.log("✅ Default categories inserted");
  } catch (err) {
    console.error("❌ Migration error:", err.message);
  }
}

// --------------------------------------------
// 🌐 Middleware
// --------------------------------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use(express.json());

// --------------------------------------------
// 📌 GET All Categories
// --------------------------------------------
app.get("/api/categories", async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------------------
// 📌 POST Add New Category
// --------------------------------------------
app.post("/api/categories", async (req, res) => {
  try {
    const { name, icon, description, providerCount, averagePrice } = req.body;

    if (!name || !icon || !description || providerCount == null || !averagePrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (exists) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const newCat = new Category({
      id: uuidv4(),
      name,
      icon,
      description,
      providerCount,
      averagePrice
    });

    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------------------
// 🔍 Health Check
// --------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    server: "running",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// --------------------------------------------
// 🚀 Start Server
// --------------------------------------------
(async () => {
  await connectDB();
  await migrateDefaults();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
  });
})();
