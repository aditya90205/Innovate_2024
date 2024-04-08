import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidateCacheProps } from "../types/types.js";

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];
    // `product-${id}`

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`)
    })

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
