import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// To Create New Product ->  /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// To get All Products with filters ->   /api/v1/product/all
app.get("/all", getAllProducts);

// To get Latest Products ->   /api/v1/product/latest
app.get("/latest", getLatestProducts);

// To get All unique categories ->  /api/v1/product/categories
app.get("/categories", getAllCategories);

// To Create All Product ->  /api/v1/product/admin-products
app.get("/admin-products",adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
