import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./editRecipe.css"; 
import { AuthContext } from "../context/AuthContext";

const EditRecipe = () =>{
    const {id} = useParams();
    const [recipe,setRecipe] = useState(null);
    const [title,setTitle] = useState("");
    const[ingredients,setIngredients] = useState("");
    const[step,setStep] = useState("");
    const[tags,setTags] = useState("");
    const[image,setImage] = useState("");
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
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
            setTitle(matchedRecipe.title);
            setIngredients(matchedRecipe.ingredients.join(", "));
            setStep(matchedRecipe.step.join(". "));
            setTags(matchedRecipe.tags.join(", "));
            setImage(matchedRecipe.image);
            console.log(matchedRecipe);
        } catch (err) {
            console.log(err);
            } 
            };
            console.log("Rending");
            fetchRecipe();
        }, [id]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        const userId = user._id;
        console.log("UserId:"+user._id);
        // console.log(title+" "+ingredients+" "+step+" "+tags);
        const payload = {
            title,
            ingredients: ingredients.split(",").map(item => item.trim()),
            step:step.split(".").map(item=>item.trim()).filter(Boolean),
            tags:tags.split(",").map(item=>item.trim()),
            image,
            userId,
        };
        try{
            const res = await axios.put(`https://recipebook-aosa.onrender.com/api/recipes/${recipe._id}`, payload, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            alert("Recipe Edited sucessfully");
            navigate(`/recipes/${recipe._id}`);
            console.log("recipe added successfully");   
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <div className="edit-recipe-container">
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit} className="edit-recipe-form">
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
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}

export default EditRecipe;