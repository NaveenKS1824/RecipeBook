const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const authroute = require('./routes/AuthRoutes');
const recipeRoute = require("./routes/RecipeRoutes");

dotenv.config();
const app = express();

const port = process.env.PORT||4000;

app.use(cors());
app.use(express.json());

console.log(process.env.JWT_SECRET);
app.use('/api/auth',authroute);
app.use('/api/recipes',recipeRoute);

mongoose
// .connect(process.env.MONGO_URI)
.connect("mongodb+srv://srdvsekar:root@cluster0.polowls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, ()=>{
        console.log("Sever is running in the port 5000");
    })
})
.catch((err) =>  console.log(err));

