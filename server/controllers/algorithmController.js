const Algorithm = require("../models/algorithmModel");

// Tüm algoritmaları getirme
exports.getAllAlgorithms = async (req, res) => {
  try {
    const algorithms = await Algorithm.find();
    res.status(200).json(algorithms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tek bir algoritmayı getirme
exports.getAlgorithmById = async (req, res) => {
  try {
    const algorithm = await Algorithm.findById(req.params.id);
    if (!algorithm) {
      return res.status(404).json({ error: "Algorithm not found" });
    }
    res.status(200).json(algorithm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Yeni algoritma oluşturma
exports.createAlgorithm = async (req, res) => {
  const { name, description, image, visualizer } = req.body;
  try {
    const newAlgorithm = new Algorithm({
      name,
      description,
      image,
      visualizer,
    });
    await newAlgorithm.save();
    res.status(201).json(newAlgorithm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Algoritmayı güncelleme
exports.updateAlgorithm = async (req, res) => {
  const { name, description, image, visualizer } = req.body;
  try {
    const algorithm = await Algorithm.findByIdAndUpdate(
      req.params.id,
      { name, description, image, visualizer },
      { new: true, runValidators: true }
    );
    if (!algorithm) {
      return res.status(404).json({ error: "Algorithm not found" });
    }
    res.status(200).json(algorithm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Algoritmayı silme
exports.deleteAlgorithm = async (req, res) => {
  try {
    const algorithm = await Algorithm.findByIdAndDelete(req.params.id);
    if (!algorithm) {
      return res.status(404).json({ error: "Algorithm not found" });
    }
    res.status(200).json({ message: "Algorithm deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
