import express from "express";
import products from "../resources/products.js";
import authorization from "../middleware/authorization.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();
const sseClients = [];

router
  .route("/:id")
  .get((req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    sseClients.push(res);

    res.on("close", () => {
      const index = sseClients.indexOf(res);
      if (index !== -1) {
        sseClients.splice(index, 1);
      }
    });
  })
  .put(authorization, (req, res) => {
    const product = products.find((p) => p.id == req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const endTime = new Date(product.end_time);

    if (endTime.getTime() < Date.now()) {
      return res.status(403).json({ msg: "Product already sold" });
    }

    if (product.current_bid >= req.body.amount) {
      return res.status(403).json({ msg: "Bid too low" });
    }

    const amount = req.body.amount;
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.key);
    const user = req.body.username || payload.name;
    const bid = { amount, user };

    product.bids.push(bid);
    product.current_bid = amount;

    const bidUpdate = { product, bidAmount: req.body.bid };
    sseClients.forEach((client) => {
      client.write(`data: ${JSON.stringify(bidUpdate)}\n\n`);
    });

    res.status(200).json({ msg: "Bid was placed successfully" });
  });

export default router;
