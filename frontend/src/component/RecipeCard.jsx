import React from "react";
import "./RecipeCard.css";
import {Link} from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  return (
    <>
    <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
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
          <button className="like-btn">Save</button>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default RecipeCard;
