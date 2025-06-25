import React, { useState,useEffect } from "react";
import RecipeCard from "../component/RecipeCard";
import "./allrecipe.css"
import recipe1 from "../assets/recipe1.jpg"
import recipe2 from "../assets/recipe2.jpg"
import axios from "axios";

const dummyData = [
  {
    image: recipe1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    tags: ["Italian", "Dinner", "Pasta"]
  },
  {
    image:recipe2,
    title: "Vegan Avocado Toast",
    description: "Healthy toast with smashed avocado and chili flakes.",
    tags: ["Vegan", "Breakfast"]
  },{
    image: recipe1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    tags: ["Italian", "Dinner", "Pasta"]
  },
  {
    image:recipe2,
    title: "Vegan Avocado Toast",
    description: "Healthy toast with smashed avocado and chili flakes.",
    tags: ["Vegan", "Breakfast"]
  },{
    image: recipe1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    tags: ["Italian", "Dinner", "Pasta"]
  },
  {
    image:recipe2,
    title: "Vegan Avocado Toast",
    description: "Healthy toast with smashed avocado and chili flakes.",
    tags: ["Vegan", "Breakfast"]
  }
];
const AllRecipes = () => {
    const [recipes,setRecipes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
     useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token"); // or sessionStorage based on your app
        const res = await axios.get("https://recipebook-aosa.onrender.com/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecipes(res.data);
      } catch (err) {
        setError("Failed to load recipes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default AllRecipes;
