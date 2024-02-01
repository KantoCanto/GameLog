import express from "express";

const router = express.Router();

//import controllers for handling routes
import UserController from "./controllers/UserController.js";
import GameController from "./controllers/GameController.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";


//User routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user/:userId", AuthMiddleware.authenticate, UserController.profile);
router.get("/logout", UserController.logout);

//Game routes
router.get("/games", GameController.getAllGames);
router.get("/games/:gameId", GameController.getGame);

module.exports = router;