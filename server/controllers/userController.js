const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Kullanıcı Kaydı
exports.createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let imagePath;

    if (req.files && req.files.image) {
      const uploadDir = "uploads";
      const imageFileName = path.basename(req.files.image[0].path);
      imagePath = `${uploadDir}/${imageFileName}`;
    }

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      imagePath,
    });

    if (imagePath) {
      user.imageUrl = `${req.protocol}://${req.get("host")}/${imagePath}`;
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kullanıcı Girişi
exports.loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "24h",
    });

    return res.json({
      user: user._id,
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// Tüm Kullanıcıları Getir
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Kullanıcı ID'sine Göre Getir
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const userObject = user.toObject();
    if (userObject.imagePath) {
      userObject.imageUrl = `${req.protocol}://${req.get("host")}/${userObject.imagePath}`;
    }
    res.send(userObject);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Kullanıcı Güncelleme
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = req.body;

    if (req.files && req.files.image) {
      const oldImagePath = user.imagePath ? path.join(__dirname, "..", user.imagePath) : null;
      if (oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      const uploadDir = "uploads";
      const imageFileName = path.basename(req.files.image[0].path);
      user.imagePath = `${uploadDir}/${imageFileName}`;
      user.imageUrl = `${req.protocol}://${req.get("host")}/${user.imagePath}`;
    }

    if (updates.password) {
      user.password = await bcrypt.hash(updates.password, saltRounds);
    }

    Object.keys(updates).forEach((update) => {
      if (update !== "password") user[update] = updates[update];
    });

    if (updates.wrongAnswers) {
      user.wrongAnswers = updates.wrongAnswers;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kullanıcı Silme
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.send({ user, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
