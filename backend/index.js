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
import session from "express-session"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//import knex from "knex";
//import knexConfig from "./knexfile.js";
import mongoose from "mongoose";
import mockData from "./data/mockdata.js";
import fetch from "node-fetch";


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//const db = knex(knexConfig);

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

const fetchData = async () => {
    try{
        const response = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
               "Client-ID": process.env.TWITCH_CLIENT_ID,
               "Authorization": process.env.ACCESS_TOKEN,
            },
            body: {
                "fields": "name,cover.url,first_release_date,platforms.name,genres.name,summary; where id = 1942; sort first_release_date desc; limit 10;"
            }
        });

        if(!response.ok){
            throw new Error(`failed to fetch data. Status: ${response.status}`)
        }

        const data = await response.json();
        console.log("Fetched Data: ",data)

    }catch(error){
        console.error("Error fetching data: ", error.message)
    }
}


//routes

app.get("/", async (req,res) =>{
    res.send("Hello World");
//     try {
//     const result = await db.raw('SELECT 1+1 as result');
//     res.json({ message: 'Database connection successful', result: result.rows[0].result });
//   } catch (error) {
//     console.error('Error connecting to the database:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
})

app.get("/api/data", (req,res) => {
    //read the mock data from the file
    res.json(mockData)
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
app.get("/games", async (req, res) => {
    //get a list of all games
    // call to the api to get the list of games
    fetchData();
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