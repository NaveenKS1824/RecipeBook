const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const authroute = require('./routes/AuthRoutes');
const recipeRoute = require("./routes/RecipeRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.JWT_SECRET);
app.use('/api/auth',authroute);
app.use('/api/recipes',recipeRoute);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(5000, ()=>{
        console.log("Sever is running in the port 5000");
    })
})
.catch((err) =>  console.log(err));

