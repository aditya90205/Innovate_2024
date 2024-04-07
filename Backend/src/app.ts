import express from "express";


// Importing Routes
import userRoute from "./routes/user.routes.js"
const port = 4000;
const app = express();

app.get('/', (req,res)=> {
    res.send('API working with /api/v1');
})

// Usind Routes
app.use('/api/v1/user', userRoute);

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    
})