const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    ingredients:[String],
    step:[String],
    tags:[String],
    image:{
        type:String,
        default:""
    },

},{timestamps:true});

module.exports = mongoose.model("Recipe",recipeSchema);