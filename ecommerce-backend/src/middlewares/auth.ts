import { User } from "../models/user";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "./error";


//Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(
    async (req, res, next) => {

        const {id} = req.query;

        if(!id) return next
        (new ErrorHandler("User must be an Logged In to access this page.", 401))
        
        const user = await User.findById(id);

        if(!user) return next
        (new ErrorHandler("Invalid Credentials", 401));

        if(user.role !== "admin") return next
        (new ErrorHandler("User accounts can not access this route.", 401))

        next();
    }
);