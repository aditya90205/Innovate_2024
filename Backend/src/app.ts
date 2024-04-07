import express from "express";


// Importing Routes
import userRoute from "./routes/user.routes.js"
import { connectDB } from "./utils/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
const port = 4000;
connectDB();
const app = express();
app.use(express.json());

app.get('/', (req,res)=> {
    res.send('API working with /api/v1');
})

// Usind Routes
app.use('/api/v1/user', userRoute);


// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    
})