import express from "express";
import products from "../resources/products.js";
import verifyRole from "../middleware/verifyRole.js";

let idCounter = products.length;

let errorMessage = "";
const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

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

router.post("/", verifyRole("admin"), (req, res) => {
  const id = idCounter++;
  const bids = [];
  const winner = null;
  const {
    name,
    category_name,
    image,
    location,
    description,
    current_bid,
    end_time,
  } = req.body;

  const newProduct = {
    id,
    name,
    category_name,
    image,
    location,
    description,
    current_bid,
    bids,
    end_time,
    winner,
  };

  const fields = [
    { name: "name", message: "Naam is vereist" },
    { name: "category_name", message: "Categorie is vereist" },
    { name: "image", message: "Afbeelding is vereist" },
    { name: "location", message: "Locatie is vereist" },
    { name: "description", message: "Beschrijving is vereist" },
    { name: "end_time", message: "Einddatum is vereist" },
  ];

  for (let field of fields) {
    if (!req.body[field.name]) {
      errorMessage = field.message;
      break;
    }
  }

  if (!errorMessage && isNaN(req.body.current_bid)) {
    errorMessage = "Startbod is vereist";
  } else if (!errorMessage && new Date(req.body.end_time) <= new Date()) {
    errorMessage = "Einddatum moet in de toekomst liggen";
  } else if (!errorMessage && req.body.current_bid < 0) {
    errorMessage = "Startbod moet hoger zijn dan 0";
  } else if (!errorMessage && !datePattern.test(req.body.end_time)) {
    errorMessage = "Einddatum moet in het formaat yyyy-mm-ddThh-mm zijn";
  }

  if (errorMessage === "") {
    products.push(newProduct);
  }

  if (products.some((product) => product.id === id)) {
    res.status(201).json({ msg: "Product toegevoegd" });
  } else if (errorMessage !== "") {
    res.status(400).json({ msg: errorMessage });
    errorMessage = "";
  } else {
    res.status(500).json({ msg: "Product not created, ID might be duplicate" });
  }
});

router.put("/:id", verifyRole("admin"), (req, res) => {
  const product = products.find((product) => product.id == req.params.id);

  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  Object.assign(product, req.body);
  res.status(200).json({ msg: "Product updated" });
});

export default router;
