// Import dependencies
const express = require("express");
const app = express();
require("dotenv").config();

// Allow parsing on request bodies
app.use(express.json());

// Import routes for api
const watsonRoutes = require("./routes/api/watson");
// Direct requests to /api/watson to Watson Routes
app.use("/api/watson", watsonRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
