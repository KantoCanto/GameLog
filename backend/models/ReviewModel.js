import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    review:{
        type: String,
        required: true,
        maxLength: 400
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Review = mongoose.model("Review, reviewSchema");

module.exports = Review