import express from "express";
import items from "../resources/items.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(items);
});

router.get("/:id", (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ msg: "Item not found" });
  }
});

router.delete("/:id", verifyRole("admin"), async (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
  if (!item) {
    return res.status(404).json({ msg: "Item not found" });
  }
  const index = items.indexOf(item);
  items.splice(index, 1);
  res.status(200).json({ msg: "Item deleted" });
});

export default router;
