import express from 'express'; 

//Importing routes
import userRoutes from "./routes/user";
import { connectDB } from './utils/features';
import { errorMiddleware } from './middlewares/error';

const port = 3000 ;

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {res.send("API Working with /api/v1");})

// Using routes
app.use("/api/v1/user", userRoutes)

app.use(errorMiddleware);

app.listen(port, ()=>{

    console.log(`Express is working on http://localhost:${port}`)
});