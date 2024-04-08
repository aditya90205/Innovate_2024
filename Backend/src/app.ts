import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";


// Importing Routes
import userRoute from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"

const port = 4000;

connectDB();

export const myCache = new NodeCache();

const app = express();

app.use(express.json());

app.get('/', (req,res)=> {
    res.send('API working with /api/v1');
})

// Usind Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);


// Static Folder Middleware
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    
})