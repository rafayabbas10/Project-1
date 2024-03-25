import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { NewUserRequestBody } from "../types/types";
import { TryCatch } from "../middlewares/error";


export const newUser = TryCatch(
    async (
    req: Request<{},{}, NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {
        const {name, email, photo, gender, _id, dob} = req.body;

        const user = await User.create({
            name, 
            email, 
            photo, 
            gender, 
            _id, 
            dob: new Date(dob),
        })

        return res.status(201).json({
            sucess: true,
            message: `Welcome, ${user.name}!`
        });
    }
);