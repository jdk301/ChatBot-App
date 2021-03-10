const express = require("express");
const app = express();
require("dotenv").config();

// allow parsing on request bodies
app.use(express.json());

// import routes for api
const watsonRoutes = require("./routes/api/watson");
// direct requests to /api/watson to Watson Routes
app.use("/api/watson", watsonRoutes);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
