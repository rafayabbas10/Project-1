import express from 'express'; 
import { connectDB } from './utils/features';
import { errorMiddleware } from './middlewares/error';

//Importing routes
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";


const port = 3000 ;

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {res.send("API Working with /api/v1");})

// Using routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/product", productRoutes)

app.use("/uploads", express.static("uploads"))
app.use(errorMiddleware);

app.listen(port, ()=>{

    console.log(`Express is working on http://localhost:${port}`)
});