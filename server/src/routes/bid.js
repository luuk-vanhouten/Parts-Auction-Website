import express from "express";
import items from "../resources/items.js";
import authorization from "../middleware/authorization.js";
const router = express.Router();

router.put("/:id", authorization, (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
});

export default router;
