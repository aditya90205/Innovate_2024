import { Product } from "../models/product.models.js";
import { OrderItemType } from "../types/types.js";

export const reduceStock = async(orderItems: OrderItemType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);  
        if(!product) throw new Error("Product Not Found");

        product.stock -= order.quantity;

        await product.save();
    }
}

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
    if(lastMonth == 0) return thisMonth * 100;
    const percent = (thisMonth/lastMonth)*100;
    return Number(percent.toFixed(0));
}


export const getInventories = async ({categories, productsCount}: {categories: string[]; productsCount: number}) => {
    const categoriesCountPromise = categories.map((category) => Product.countDocuments({category}));  // count document with respect to their category

    const categoriesCount = await Promise.all(categoriesCountPromise);

    const categoryCount: Record<string, number>[] = [];

    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round ((categoriesCount[i]/productsCount) * 100),
      })
    })

    return categoryCount;
}