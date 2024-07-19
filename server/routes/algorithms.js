const express = require("express");
const router = express.Router();
const algorithmController = require("../controllers/algorithmController");

// Tüm algoritmaları getirme
router.get("/", algorithmController.getAllAlgorithms);

// Tek bir algoritmayı getirme
router.get("/:id", algorithmController.getAlgorithmById);

// Yeni algoritma oluşturma
router.post("/", algorithmController.createAlgorithm);

// Algoritmayı güncelleme
router.put("/:id", algorithmController.updateAlgorithm);

// Algoritmayı silme
router.delete("/:id", algorithmController.deleteAlgorithm);

module.exports = router;
