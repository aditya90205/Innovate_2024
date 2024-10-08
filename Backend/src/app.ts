import express from "express";
import { connectDB } from "./utils/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";



// Importing Routes
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";
import paymentRoute from "./routes/payment.routes.js";
import dashBoardRoute from "./routes/stats.routes.js";



config({
    path:"./.env",
})

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);


export const stripe = new Stripe(stripeKey)
export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req,res)=> {
    res.send('API working with /api/v1');
})

// Using Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/dashboard', dashBoardRoute);


// Static Folder Middleware
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    
})