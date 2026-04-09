import { CartModel } from "../models/cart-model.js";

class CartRepository {
  constructor(model) {
    this.model = model;
  }

  create = async () => {
    return await this.model.create({ products: [] });
  };

  getById = async (id) => {
    return await this.model.findById(id)
      .populate("products.product"); // 🔥 populate
  };

  update = async (id, products) => {
    return await this.model.findByIdAndUpdate(
      id,
      { products },
      { new: true }
    );
  };

  delete = async (id) => {
    return await this.model.findByIdAndUpdate(
      id,
      { products: [] },
      { new: true }
    );
  };
}

export const cartRepository = new CartRepository(CartModel);