const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// __________express__________

const express = require("express");
const server = express();
// _____________bodyParser________________
server.use(express.json());
//server.use(express.urlencoded)
server.use(express.static("public"));

// ____________middlewear________________
server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    req.get("User-Agent"),
    new Date()
  );
  next();
});
const auth = (req, res, next) => {
  console.log(req.query);
  if (req.query.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};
//server.use(auth)
// ______API ,EndPoint,router_______
server.get("/", auth, (req, res) => {
  res.json({ type: "GET1" });
});
server.post("/", (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});
server.patch("/", () => {
  res.json({ type: "PATCH" });
});

server.get("/demo", (req, res) => {
  // res.send('hello')
  //res.json(products)
  //res.sendStatus(404)
});

server.listen(8080, () => {
  console.log("server started");
});
