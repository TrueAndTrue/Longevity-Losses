const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
