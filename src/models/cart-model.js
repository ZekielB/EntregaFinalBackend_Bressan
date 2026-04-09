import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products" // ⚠️ tiene que coincidir con tu model('products')
      },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export const CartModel = model("carts", cartSchema);