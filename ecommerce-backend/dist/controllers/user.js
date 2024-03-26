"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUsers = exports.newUser = void 0;
const user_1 = require("../models/user");
const error_1 = require("../middlewares/error");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
exports.newUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await user_1.User.findById(_id);
    if (user)
        return res.status(200).json({
            suceess: true,
            message: `Welcome, ${user.name}`,
        });
    if (!_id || !name || !photo || !gender || !dob)
        return next(new utility_class_1.default("Please fill all feilds!", 400));
    user = await user_1.User.create({
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
exports.getAllUsers = (0, error_1.TryCatch)(async (req, res, next) => {
    const users = await user_1.User.find({});
    return res.status(200).json({
        sucess: 200,
        users,
    });
});
exports.getUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_1.User.findById(id);
    if (!user)
        return next(new utility_class_1.default("Invalid ID", 400));
    return res.status(200).json({
        sucess: 200,
        user,
    });
});
exports.deleteUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_1.User.findById(id);
    if (!user)
        return next(new utility_class_1.default("Invalid ID", 400));
    await user.deleteOne();
    return res.status(200).json({
        sucess: 200,
        message: "User Deleted Successfully",
    });
});
