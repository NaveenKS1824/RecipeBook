import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./recipeDetails.css";
import Loading from "../component/Loading";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
//   const handleEdit =()=>{
//     navigate(`/recipes/edit/${recipe._id}`);
//   }
  useEffect(() => {
    const fetchRecipe = async (req,res) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://recipebook-aosa.onrender.com/api/recipes`, {
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

  if (loading) return <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Loading/></div>;
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
                <Link to={`/recipes/edit/${recipe._id}`}><button className="edit-btn" onClick={()=>{handleEdit}}>Edit</button></Link>
            </div>
      </div>
      
      {/* <button onClick={()=>navigate(`/recipes/:${recipe._id}`)}>Edit</button> */}
      {/* <button onClick={() => navigate(`/${recipe._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default RecipeDetails;