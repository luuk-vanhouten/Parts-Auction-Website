import express from "express";
import products from "../resources/products.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ msg: "Product not found" });
  }
});

router.delete("/:id", verifyRole("admin"), async (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.status(200).json({ msg: "Product deleted" });
});

export default router;
