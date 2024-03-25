"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Importing routes
const user_1 = __importDefault(require("./routes/user"));
const port = 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => { res.send("API Working with /api/v1"); });
// Using routes
app.use("/api/v1/user", user_1.default);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});
