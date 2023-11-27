const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

// Configure AWS SDK
aws.config.update({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION' 
});

// Create Nodemailer transport
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

// Send an email
transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello World!'
}, (err, info) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Email sent: ', info);
    }
});



const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

//Used for session cookie

const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");

app.use(cors());

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up view engine

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(
  session({
    name: "caloriesapp",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on", port);
});
