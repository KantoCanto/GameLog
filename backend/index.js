// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();


// async function CreateUser(){
//     await prisma.user.create({
//         data: {
//             id: 1,
//             username: "kanto",
//             email: "kanto@mail.com",
//             password: "456456456"
//         }
//     })
// }

// async function TestQuery(){
//     const allUsers = await prisma.user.findMany();
//     console.log(allUsers);
// }
// CreateUser();
// TestQuery()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.log(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     })


import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//db connect
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI + "test")
        console.log("MongoDB connected")
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

connectDB();

//routes

app.get("/", (req,res) =>{
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})


//user registration
app.get("/register", (req, res) => {
   //render the register page with registration form
})

app.post("/register", (req,res) => {
     //create a new user account
    //requires --> username, email, password
    //action --> create a new user in the database
})

//user login 
app.get("/login", (req,res) => {
    //render the login page with login form
})

app.post("/login", (req,res) => {
    //login the user
    //requires --> email, password
    //action --> find the user in the database
          // --> generate a JWT token and return it
})

//user profile
app.get("/profile/:userId", (req, res) => {
    //get the user profile information
    //requires --> userId
    //action --> retrieve and display user details (username, date joined, reviews, ratings, to play, favourites)
})

//game list
app.get("/games", (req, res) => {
    //get a list of all games
    //action --> retrieve and display games
})

//game page
app.get("/games/:gameId", (req,res) => {
    //requires gameId
    //action --> retrieve and display information about a specific game
})



//define schema
// const kittySchema = new mongoose.Schema({
//     name: String
// })

// kittySchema.methods.speak = function(){
//     const greeting = this.name
//         ? "meow name is " + this.name
//         : "I don't have a name";
//     console.log(greeting)
// }

//compiling schema into model

// const Kitten = mongoose.model("Kitten", kittySchema);

// const silence = new Kitten({
//     name: "Silence"
// })

// console.log(silence.name)

// const fluffy = new Kitten({name: "fluffy"});
// fluffy.speak();
// await fluffy.save();

// const foundKittens = await Kitten.find();
// console.log(foundKittens);