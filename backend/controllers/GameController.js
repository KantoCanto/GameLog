import GameModel from '../models/GameModel';

const GameController = {
    

    //get a list of all games
    getAllGames: async (req, res) =>{
        try{
            const games = await GameModel.find();
            res.json({games})
        }catch(e){
            console.log(e);
            res.status(500).json({error: "Server Error"})
        }
    },

    //get a specific game
    getGame: async (req, res) =>{
        try{
            const game = await GameModel.findById(req.params.gameId);

            if(!game){
                return res.status(404).json({error: "Game not found"})
            }

            res.json({game})
        }catch(e){
            console.log(e);
            res.status(500).json({error: "Server Error"})
        }
    }
}

module.exports = GameController;