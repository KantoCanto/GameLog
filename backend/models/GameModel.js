import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    developer:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;