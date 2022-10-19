const express = require("express");
const res = require("express/lib/response");
const { send, sendStatus } = require("express/lib/response");

// Makes the express app
const app = express();

app.listen('3000', () => {
    console.log('server running on local host 3000')
})

// Allows the html page and css styles to be rendered
app.set("view engine", "ejs");

// Recieves get request and renders landing page
app.get('/', (req,res) => {
    res.render('index')
})