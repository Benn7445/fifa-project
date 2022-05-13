const express = require("express");
const app = express();
const ejs = require("ejs"); // EJS import

app.use(express.static("public"));
app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);
