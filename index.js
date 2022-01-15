const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");

//setup express app
const app = express();
app.use(
  cors({
    origin: "https://modest-hypatia-ed4230.netlify.app",
    credentials: true,
    methods: ["GET", "PUT", "POST"],
  })
);

app.set("trust proxy", 1);

// let’s you use the cookieParser in your application
app.use(cookieParser());

//a get route for adding a cookie
var date = new Date();

// add a day
date.setDate(date.getDate() + 1);
app.get("/setcookie", (req, res) => {
  res.cookie(`access_token`, `encrypted cookie string Value`, {
    maxAge: 50000,
    // expires works the same as the maxAge
    expires: date,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.cookie(`rsa_key`, `encrypted cookie string Value`, {
    maxAge: 50000,
    // expires works the same as the maxAge
    expires: date,
    // httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.send("Cookie have been saved successfully");
});

app.get("/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);
  res.send(req.cookies);
});

//server listening to port 8000
app.listen(8000, () => console.log("The server is running port 8000..."));
