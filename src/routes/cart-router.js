 import { Router } from "express";
import { cartRepository } from "../repositories/cart-repository.js";

const router = Router();

// Crear carrito
router.post("/", async (req, res) => {
  const cart = await cartRepository.create();
  res.json(cart);
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await cartRepository.getById(req.params.cid);
  res.json(cart);
});

// ❌ eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await cartRepository.getById(req.params.cid);

  cart.products = cart.products.filter(
    p => p.product._id.toString() !== req.params.pid
  );

  await cart.save();
  res.json(cart);
});

// 🔁 actualizar TODO el carrito
router.put("/:cid", async (req, res) => {
  const updated = await cartRepository.update(
    req.params.cid,
    req.body
  );
  res.json(updated);
});

// 🔢 actualizar cantidad
router.put("/:cid/products/:pid", async (req, res) => {
  const cart = await cartRepository.getById(req.params.cid);

  const product = cart.products.find(
    p => p.product._id.toString() === req.params.pid
  );

  if (product) {
    product.quantity = req.body.quantity;
  }

  await cart.save();
  res.json(cart);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const cart = await cartRepository.getById(cid);

  const existingProduct = cart.products.find(
    p => p.product._id.toString() === pid
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();

  res.json(cart);
});


// 🧨 vaciar carrito
router.delete("/:cid", async (req, res) => {
  const cart = await cartRepository.delete(req.params.cid);
  res.json(cart);
});

export default router;