const Recipe = require("../model/recipe");

exports.createRecipe = async (req,res) =>{
    try{
        const  recipe = await Recipe.create({...req.body, userId:req.user});
        res.status(201).json(recipe);
    }catch(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message, err });
        }
        res.status(500).json({ message: "Server error", err });
    }
};

exports.getUserRecipes = async (req,res) =>{
    try{
        const recipe = await Recipe.find({userId:req.user});
        res.status(200).json(recipe);
    }catch(err){
        res.status(500).json({ message: "Error fetching recipes", err })
    }
};
exports.getRecipeById = async (req,res) =>{
    try{
        const recipe = await Recipe.findOne({_id:req.params.id,userId:req.user});
        if(!recipe){
            return res.status(404).json({message:"Recipe not found"});
        }
        res.status(201).json(recipe);
    }catch(err){
        res.status(500).json({message:"Server failed",err});
    }
};
exports.updateRecipes = async(req,res) =>{
    try{
        const recipe = await Recipe.findOneAndUpdate(
            {_id:req.params.id,userId:req.user},req.body,{new:true});
        if(!recipe){
            res.status(400).json({message:"recipe is not found"});
        }
        res.status(200).json(recipe);
    }catch(err){
        res.status(500).json({ message: "Error Updating recipes", err })
    }
};

exports.deleteRecipe = async (req,res) =>{
    try{
        const recipe = await Recipe.findOneAndDelete({_id:req.params.id,userId:req.user});
        if(!recipe){
            return res.status(400).json({message:"Recipe is not found"});
        }
        res.status(200).json({message:"Recipe is deleted successfully"});
    }catch(err){
        res.statuc(500).json({message:"Error is deleting recipe",err});
    }
};

