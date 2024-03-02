// expressServer.js
const express = require("express");
const app = express();

const body_parser = require("body-parser");
const authRoute = require("../router/auth_route");

// user body parser

app.use(body_parser.json());

app.use(body_parser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Define routes

app.use("/auth", authRoute);

module.exports = app;
