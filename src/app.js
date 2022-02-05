require("dotenv").config();
const express = require("express");

const server = express();
const port = process.env.PORT || 3000;

server.set("port", port);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/v1/", require("./routes"));

// server.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// server.get("*", (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });
server.listen(port, () => console.log(`listening on http://localhost:${port}`));
