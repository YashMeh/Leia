const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  mongoose = require("mongoose"),
  port = process.env.PORT || 8080;

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable all CORS requests
app.use(cors());

// ROUTES
const clientRoutes = require("./controllers/client");
app.use("/api", clientRoutes);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running at port ${port}`);
});
