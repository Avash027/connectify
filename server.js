const express = require("express");

const app = express();

const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.use(express.json());
require("dotenv").config();
require("./config/db")();
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.use("/api/auth", require("./api/auth"));

  app.all("*", (req, res) => handle(req, res));
  server.listen(PORT, (error) => {
    if (error) console.error(error);
    console.log(`Server running in port ${PORT}`);
  });
});
