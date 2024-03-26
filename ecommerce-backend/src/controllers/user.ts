import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { NewUserRequestBody } from "../types/types";
import { TryCatch } from "../middlewares/error";
import ErrorHandler from "../utils/utility-class";


export const newUser = TryCatch(
    async (
    req: Request<{},{}, NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {
        const {name, email, photo, gender, _id, dob} = req.body;

        let user = await User.findById(_id);

        if(user) return res.status(200).json({
            suceess: true,
            message: `Welcome, ${user.name}`,
        })

        if(!_id || !name || !photo || !gender || !dob)  return next(new ErrorHandler("Please fill all feilds!", 400))

        user = await User.create({
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

export const getAllUsers = TryCatch(
    async (req, res, next) => {
        const users = await User.find({})

        return res.status(200).json({
            sucess: 200,
            users,
        })
    }
);

export const getUser = TryCatch(
    async (req, res, next) => {

        const id = req.params.id;
        const user = await User.findById(id);

        if(!user) return next(new ErrorHandler("Invalid ID", 400));

        return res.status(200).json({
            sucess: 200,
            user,
        })
    }
);

export const deleteUser = TryCatch(
    async (req, res, next) => {

        const id = req.params.id;
        const user = await User.findById(id);

        if(!user) return next(new ErrorHandler("Invalid ID", 400));

        await user.deleteOne();

        return res.status(200).json({
            sucess: 200,
            message: "User Deleted Successfully",
        })
    }
);