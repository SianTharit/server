require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
// ROUTE IMPORTS
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const omiseRouter = require("./routes/omiseRoute");

// MIDDLEWARE CHECK TOKEN
const authenticate = require("./middlewares/authenticate");
// MIDDLEWARE ERR
const errMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // part request

// const createCharge = async () => {
//    const customer = await omise.customers.create({
//       email: "sian.doe@example.com",
//       description: "John Doe (id: 30)",
//       card: "tokn_test_5s4dhwa70fg60b14qx9",
//    });

//    const charge = await omise.charges.create({
//       amount: 10000,
//       currency: "thb",
//       customer: customer.id,
//    });
//    console.log("Charge -->", charge);
// };

// API SHOOTING ROUTES
app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/products", productRouter);
app.use("/carts", authenticate, cartRouter);
app.use(omiseRouter);

// ERROR HANDLING
app.use(notFoundMiddleware);
app.use(errMiddleware);

// START SERVER ON PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
