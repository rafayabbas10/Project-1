import express from 'express';
import { adminOnly } from '../middlewares/auth';
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/product';
import { singleUpload } from '../middlewares/multer';

const app = express.Router();

//Create a new product - /api/v1/product/new
app.post("/new",adminOnly, singleUpload, newProduct);

//Get last 5 products - /api/v1/product/latest
app.get("/latest", getLatestProducts);

//Get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//Get all products - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct);

export default app;