import express from "express";
import products from "../resources/products.js";
import authorization from "../middleware/authorization.js";
const router = express.Router();

router.put("/:id", authorization, (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
});

export default router;
