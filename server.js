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
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const transactionRouter = require("./routes/transaction.route");
const paymentRouter = require("./routes/payment.route");

app.use("/users", userRouter);

app.use("/stores", storeRouter);

app.use("/products", productRouter);

app.use("/api", cartRouter);

app.use("/api", transactionRouter);

app.use("/api", paymentRouter);

app.listen(port, () => {
  console.log(`server ready on port ${port}`);
});
