"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const user_1 = require("../models/user");
const error_1 = require("../middlewares/error");
exports.newUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    const user = await user_1.User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });
    return res.status(201).json({
        sucess: true,
        message: `Welcome, ${user.name}!`
    });
});
