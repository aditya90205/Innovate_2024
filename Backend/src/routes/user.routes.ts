import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.controllers.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// route -> /api/v1/user/new
app.post('/new', newUser);

// route -> /api/v1/user/all
app.get('/all', adminOnly,getAllUsers);

// route -> /api/v1/user/dynamicID(:id)
app.get('/:id', getUser);       // ---app.route("/:id").get(getUser).delete(deleteUser);
app.delete('/:id', adminOnly,deleteUser);  



export default app;