import { ProductModel } from "../models/product-model.js"

class ProductRepository {
  constructor(model) {
    this.model = model;
  }

 
getAll = async ({ limit = 10, page = 1, sort, query }) => {
  try {
    
    let filter = {};

    if (query) {
      if (query === "true" || query === "false") {
        
        filter.stock = query === "true" ? { $gt: 0 } : 0;
      } else {
        
        filter.category = query;
      }
    }

    
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    
    const products = await this.model
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    // TOTAL
    const total = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // LINKS
    const baseUrl = "http://localhost:8080/api/products";

    return {
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      nextLink: page < totalPages ? `${baseUrl}?page=${page + 1}` : null
    };

  } catch (error) {
    throw new Error(error);
  }
};


  getById = async (id) => {
    try {
      return await this.model.findById(id); //findOne({_id: id})
    } catch (error) {
      throw new Error(error);
    }
  };
  create = async (body) => {
    try {
      return await this.model.create(body); //insertOne
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, body) => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true }); //updateOne $set
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id); //deleteOne
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productRepository = new ProductRepository(ProductModel);