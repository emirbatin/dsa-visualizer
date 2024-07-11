require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const path = require("path");
const cors = require("cors");

const app = express();

// Ortam değişkenlerine göre veritabanı URI'sini seçme
const mongoUri = process.env.NODE_ENV === 'development'
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD;

// Ortam değişkenlerine göre CORS ayarlarını yapma
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://api.codewithbatin.com",
  methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

console.log(`Using Mongo URI: ${mongoUri}`); // Hangi URI'nin kullanıldığını kontrol etmek için
console.log(`CORS Origin: ${corsOptions.origin}`); // CORS ayarını kontrol etmek için

// Use CORS middleware with specific configuration
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Preflight OPTIONS isteğini CORS ile izin ver

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Statik dosya servisi
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
