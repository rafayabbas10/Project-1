"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const user_1 = require("../models/user");
const newUser = async (req, res, next) => {
    try {
        const { name, email, photo, gender, role, _id, dob } = req.body;
        const user = await user_1.User.create({});
        return res.status(200).json({
            sucess: true,
            message: `Welcome, ${user.name}!`
        });
    }
    catch (err) { }
};
exports.newUser = newUser;
