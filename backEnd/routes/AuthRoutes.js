
const express = require("express");
const { signup, login } = require("../controller/userController");
const router = express.Router();
const auth = require("../middleware/AuthMiddleware");
const User = require("../model/user")

router.post('/signup',signup);
router.post('/login',login);
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
  }
});

module.exports = router;