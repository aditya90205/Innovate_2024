import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";


// Importing Routes
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";
import morgan from "morgan";

config({
    path:"./.env",
})

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req,res)=> {
    res.send('API working with /api/v1');
})

// Usind Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);


// Static Folder Middleware
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    
})