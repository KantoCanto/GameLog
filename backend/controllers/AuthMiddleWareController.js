import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const AuthMiddleWare = {
    //middleware to authenticate requests
    authenticate: async (req, res, next) => {
        const token = req.header("Authorization");

        if(!token){
            return res.status(401).json({error: "No token, authorization denied"})
        }

        try{
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //attack the user to the request for further use in the route handler
            req.user = await User.findById(decoded.userId);

            next()
        }catch(e){
            console.log(e);
            res.status(500).json({error: "Invalid Token"})
        }
    }
}

module.exports = AuthMiddleWare;