import express from 'express'; 

//Importing routes
import userRoutes from "./routes/user";

const port = 3000 ;

const app = express();

app.get("/", (req, res) => {res.send("API Working with /api/v1");})

// Using routes
app.use("/api/v1/user", userRoutes)

app.listen(port, ()=>{

    console.log(`Express is working on http://localhost:${port}`)
});