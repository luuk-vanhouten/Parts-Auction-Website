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

router.delete("/:id", verifyRole("admin"), (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.status(200).json({ msg: "Item deleted" });
  } else {
    res.status(404).json({ msg: "Item not found" });
  }
});

export default router;
