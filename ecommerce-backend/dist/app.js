"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const features_1 = require("./utils/features");
const error_1 = require("./middlewares/error");
//Importing routes
const user_1 = __importDefault(require("./routes/user"));
const products_1 = __importDefault(require("./routes/products"));
const port = 3000;
(0, features_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => { res.send("API Working with /api/v1"); });
// Using routes
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/product", products_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use(error_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});
