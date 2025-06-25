import React, { useState } from "react";
import axios from "axios";
import "./addrecipe.css"; 

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [step, setStep] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); 
    console.log(token);
    const userId = localStorage.getItem("userId");
    const payload = {
      title,
      ingredients: ingredients.split(",").map(item => item.trim()),
      step: step.split(".").map(item => item.trim()).filter(Boolean),
      tags: tags ? tags.split(",").map(item => item.trim()) : [],
      image,
      userId,
    };

    try {
      const res = await axios.post("https://recipebook-aosa.onrender.com/api/recipes", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Recipe added successfully!");
      setTitle(""); setIngredients(""); setStep(""); setTags(""); setImage("");
    } catch (err) {
      setMessage("Error adding recipe");
      console.log(err);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Steps (separate by full stops)"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (optional, comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>
      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default AddRecipe;
