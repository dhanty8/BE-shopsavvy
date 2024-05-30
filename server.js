require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/user.route");
const storeRouter = require("./routes/store.route");

app.use("/users", userRouter);

app.use("/stores", storeRouter);

app.listen(port, () => {
  console.log(`server ready on port ${port}`);
});
