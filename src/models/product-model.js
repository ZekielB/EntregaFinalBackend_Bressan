import {Schema, model} from "mongoose"

const ProductSchema = new Schema({
name: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String, required: true },
category: { type: String, required: true },
stock: { type: Number, required: true },

})

ProductSchema.index({ category: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ price: 1 });

export const ProductModel = model('products', ProductSchema)


