const express = require("express");

const User = require("../models/userModel.js");
const userController = require("../controllers/userController");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

const router = express.Router();

// Yeni login route'u
router.post("/login", userController.loginUser);

router.get("/secret", authenticateToken, (req, res) => {
  res.send("Gizli bilgi, sadece doğrulanmış kullanıcılar görebilir.");
});

// Kullanıcı register route'u
router.post("/register", userController.createUser);

//GET All Users
router.get("/", getAllUsers);

// GET a single user
router.get("/:id", getUserById);

//Post a new user
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createUser);

//Update a user
router.patch(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateUser
);

//Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
