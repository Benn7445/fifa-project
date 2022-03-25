import { Interface } from "readline";
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("port", 3000);

app.get("/", (req: any, res: any) => {
  res.type("text/html");
  res.send(
    "<h1>helloExpress applicatie.</h1> <p>Dit applicatie zal mijn informatie weergeven en informatie over pikachu</p>"
  );
});
