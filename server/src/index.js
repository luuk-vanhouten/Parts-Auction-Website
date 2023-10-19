import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

import auth from "./routes/auth.js";
import item from "./routes/item.js";
import bid from "./routes/bid.js";

// Cross Origin Resource Sharing
// todo: remove || !origin after testing
const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log("origin", origin);
      callback(null, true);
    } else {
      // console.log("origin", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", auth);
app.use("/bid", bid);
app.use("/item", item);

app.get("/", (req, res) => {
  console.log(req);
  // res.send('Hello World!')
  res.json({ msg: "hello world" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
