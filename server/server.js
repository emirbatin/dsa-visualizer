require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();

// Choose MongoDB URI based on environment
const mongoUri = process.env.NODE_ENV === 'development'
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD;

// CORS options based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://api.codewithbatin.com",
  methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

console.log(`Using Mongo URI: ${mongoUri}`);
console.log(`CORS Origin: ${corsOptions.origin}`);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight OPTIONS request

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Static file service
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose.connect(mongoUri, )
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      app.listen(process.env.PORT, () => {
        console.log(`HTTP Server is running on port ${process.env.PORT}`);
      });
    } else {
      https.createServer(sslOptions, app).listen(process.env.PORT, () => {
        console.log(`HTTPS Server is running on port ${process.env.PORT}`);
      });
    }
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
