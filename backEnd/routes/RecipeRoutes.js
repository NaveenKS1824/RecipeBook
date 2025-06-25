const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const auth = require("../middleware/AuthMiddleware");
const { getUserRecipes, createRecipe, updateRecipes, deleteRecipe, getRecipeById } = require("../controller/recipeController");

const router = express.Router();

// router.use(auth);

router.get("/",auth,getUserRecipes);
router.post("/",auth,createRecipe);
router.put("/:id",auth,updateRecipes);
router.delete("/:id",auth,deleteRecipe);
router.get("/:id",auth,getRecipeById);

module.exports = router;