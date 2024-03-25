import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { NewUserRequestBody } from "../types/types";


export const newUser = async (
    req: Request<{},{}, NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {
    try{
        const {name, email, photo, gender, role, _id, dob} = req.body;

        const user = await User.create({

        })

        return res.status(200).json({
            sucess: true,
            message: `Welcome, ${user.name}!`
        });
    } catch(err){}

};