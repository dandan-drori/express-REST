const express = require("express");
require("dotenv").config();
const cors = require("cors");
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", cors(), usersRoutes);
app.use("/login", cors(), loginRoutes);
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`
    Active paths:
      1. /users 
      2. /login
  `);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server running on port ${PORT}`);
  }
});
