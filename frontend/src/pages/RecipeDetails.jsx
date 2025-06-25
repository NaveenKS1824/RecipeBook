import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./recipedetails.css"; // You'll create this

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async (req,res) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const matchedRecipe = res.data.find((r) => r._id === id);
        setRecipe(matchedRecipe);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-left">
        <h2>{recipe.title}</h2>
            {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            )}
      </div>
      <div className="recipe-details-right">
            <section>
                <h3>Ingredients</h3>
                <ul>
                {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </section>

            <section>
                <h3>Steps</h3>
                <ol>
                {recipe.step.map((s, i) => (
                    <li key={i}>{s}</li>
                ))}
                </ol>
            </section>

            <div className="tags">
                {recipe.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
                ))}
            </div>
      </div>
      {/* <button onClick={()=>navigate(`/recipes/:${recipe._id}`)}>Edit</button> */}
      {/* <button onClick={() => navigate(`/${recipe._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default RecipeDetails;