import { myCache } from "../app.js";
import { Product } from "../models/product.models.js";
import { InvalidateCacheProps } from "../types/types.js";

export const invalidateCache = ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${i}`));

    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`
    ];

    myCache.del(orderKeys);
  }
  if (admin) {
    myCache.del(["admin-stats", "admin-pie-charts", "admin-line-charts", "admin-bar-charts"])
  }
};
