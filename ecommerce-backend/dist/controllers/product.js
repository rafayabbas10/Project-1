"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProducts = exports.getAllCategories = exports.getLatestProducts = exports.newProduct = void 0;
const error_1 = require("../middlewares/error");
const product_1 = require("../models/product");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const fs_1 = require("fs");
exports.newProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new utility_class_1.default("Please Add Photo", 400));
    if (!name || !category || !price || !stock) {
        (0, fs_1.rm)(photo.path, () => {
            console.log("Deleted");
        });
        return next(new utility_class_1.default("Plese fill All Feilds.", 400));
    }
    await product_1.Product.create({
        name,
        category: category.toLowerCase(),
        price,
        stock,
        photo: photo.path
    });
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully"
    });
});
exports.getLatestProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const products = await product_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(201).json({
        success: true,
        products,
    });
});
exports.getAllCategories = (0, error_1.TryCatch)(async (req, res, next) => {
    const categories = await product_1.Product.distinct("category");
    return res.status(201).json({
        success: true,
        categories,
    });
});
exports.getAdminProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const products = await product_1.Product.find({});
    return res.status(201).json({
        success: true,
        products,
    });
});
exports.getSingleProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const product = await product_1.Product.findById(req.params.id);
    if (!product)
        return next(new utility_class_1.default("Product Not Found", 404));
    return res.status(201).json({
        success: true,
        product,
    });
});
exports.updateProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    const product = await product_1.Product.findById(id);
    if (!product)
        return next(new utility_class_1.default("Invaild Product Id", 404));
    if (photo) {
        (0, fs_1.rm)(product.photo, () => {
            console.log("Old Photo Deleted");
        });
        product.photo = photo.path;
        return next(new utility_class_1.default("Plese fill All Feilds.", 400));
    }
    if (name)
        product.name = name;
    if (category)
        product.category = category;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    await product.save();
    return res.status(201).json({
        success: true,
        message: "Product Updated Successfully"
    });
});
exports.deleteProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const product = await product_1.Product.findById(req.params.id);
    if (!product)
        return next(new utility_class_1.default("Product Not Found", 404));
    (0, fs_1.rm)(product.photo, () => {
        console.log("Product Photo Deleted");
    });
    await product_1.Product.deleteOne();
    return res.status(201).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
