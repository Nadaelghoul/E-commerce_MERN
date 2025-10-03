import { NextFunction , Request , Response} from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

  export interface ExtendRequest extends Request {
    user?: any;
}

const validateJWT = (req : ExtendRequest, res : Response, next : NextFunction) => {
      const authorizationHeader = req.get('authorization');

      if(! authorizationHeader){
         res.status(403).send("Authorization Header was not provided"); // request must had header that contain authorization part that contain bearer..token , if it is not exist he will return this message response and exit from the function and not go to next which is the route that validateJWT is applying on it. 
         return;
      }

      const bearerToken = authorizationHeader.split(" "); // split the auth part to bearer then "" then  the token(which we want)
      const token = bearerToken[1];

      if(!token){
         res.status(403).send("Bearer token not found");
         return;
      }

    jwt.verify(token, process.env.JWT_SECRET || '',async (err, payload)=> {  // verify that token = the secret key that we genarate with jwt.sign function in  userservices.ts
         if(err){
            res.status(403).send("Invalid token"); 
           return;
         }

         if(!payload){
            res.status(403).send("Invalid token payload"); 
            return;
         }

         const userPayload = payload as {
              email: String;
              firstName: String;
              lastName: String;
         };
        // fetch user from db based on the payload(jwt generated on user email, firstname, and lastname)
        const user = await userModel.findOne({email: userPayload.email});
        req.user = user;
        next();
    });
};


export default validateJWT;