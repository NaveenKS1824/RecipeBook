import React from "react";
import "./RecipeCard.css";
import {Link} from "react-router-dom";
import axios from "axios";
const RecipeCard = ({ recipe, fetchRecipes }) => {
  const handleDelete = async() =>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.delete(`https://recipebook-aosa.onrender.com/api/recipes/${recipe._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        console.log(recipe._id);
        fetchRecipes();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-img" />
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        {/* <p className="recipe-description">{recipe.description}</p> */}
        <div className="recipe-tags">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="recipe-actions">
          <Link to={`/recipes/${recipe._id}`} className="recipe-card-link"><button className="like-btn">View</button></Link>
          <Link onClick={handleDelete}className="recipe-card-link"><button className="like-btn">Delete</button></Link>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default RecipeCard;
