import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import bid from "./routes/bid.js";
import item from "./routes/item.js";

const app = express();
const port = process.env.PORT || 3000;

// Define a middleware function to handle CORS
const corsMiddleware = cors({
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
});

// Use the middleware function for all routes
app.use(corsMiddleware);
app.use(express.json());
app.use("/auth", auth);
app.use("/bid", bid);
app.use("/item", item);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
