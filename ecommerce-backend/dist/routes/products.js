"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const product_1 = require("../controllers/product");
const multer_1 = require("../middlewares/multer");
const app = express_1.default.Router();
//Create a new product - /api/v1/product/new
app.post("/new", auth_1.adminOnly, multer_1.singleUpload, product_1.newProduct);
//Get last 5 products - /api/v1/product/latest
app.get("/latest", product_1.getLatestProducts);
//Get all unique categories - /api/v1/product/categories
app.get("/categories", product_1.getAllCategories);
//Get all products - /api/v1/product/admin-products
app.get("/admin-products", product_1.getAdminProducts);
app.route("/:id").get(product_1.getSingleProduct).put(auth_1.adminOnly, multer_1.singleUpload, product_1.updateProduct).delete(auth_1.adminOnly, product_1.deleteProduct);
exports.default = app;
