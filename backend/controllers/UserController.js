import User from "../models/UserModel.js";
import {generateToken} from "../utils/generateToken.js";


const UserController = {

    //register a new user
    register: async (req,res) => {
        const {username, email, password} = req.body;

        try{
            const newUser = await User.create({username, email, password});
            const token = generateToken(newUser)

            res.status(201).json({user: newUser, token})
        }catch(e){
            console.log(e);
            res.status(500).json({message: "Server Error"})
        }
    },

    //login user
    login: async (req, res) => {
        const {email, password} = req.body;

        try{
            const user = await User.findOne({email});
            
            if(!user || user.password !== password){
                return res.status(401).json({message: "Invalid credentials"})
            }

            const token = generateToken(user);

            res.json({user, token})
        }catch(e){
            console.log(e);
            res.status(500).json({message: "Server Error"})
        }
    },

    //get user profile
    profile: async (req, res) => {
        const {userId} = req.params;

        try{    
            const user = await User.findById(userId);

            if(!user){
                return res.status(404).json({message: "User not found"})
            }

            res.json({user})
        }catch(e){
            console.log(e);
            res.status(500).json({mesage: "Server Error"})
        }
    }
}

module.exports = UserController;