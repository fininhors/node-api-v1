require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const server = express();
const port = process.env.PORT || 3000;

server.set("port", port);
server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/v1/", require("./routes"));

server.listen(port, () => console.log(`listening on http://localhost:${port}`));
