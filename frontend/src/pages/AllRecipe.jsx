import React, { useState,useEffect } from "react";
import RecipeCard from "../component/RecipeCard";
import "./allrecipe.css"
import recipe1 from "../assets/recipe1.jpg"
import recipe2 from "../assets/recipe2.jpg"
import axios from "axios";
import Loading from "../component/Loading";
import { IoSearchOutline } from "react-icons/io5";


const AllRecipes = () => {
    const [recipes,setRecipes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [search,setSearch] = useState("");
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

  if (loading) return <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Loading/></div>
  if (error) return <p>{error}</p>;
  return (
    <>
    <div className="search-content">
        
        <input 
        type="text" 
        placeholder="        Enter the text her"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        {!search && <IoSearchOutline className="icon"/>}
    </div>
    <div className="recipe-grid">
      {recipes.filter((i)=>search!==''?i.title.toLowerCase().includes(search.toLowerCase()):i).map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
    </>
  );
};

export default AllRecipes;
