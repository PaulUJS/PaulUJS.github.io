const express = require("express");
const res = require("express/lib/response");
const { send, sendStatus } = require("express/lib/response");
const { dirname } = require("path");
const path = require("path");   

// Makes the express app
const app = express();

app.listen('3000', () => {
    console.log('server running on local host 3000')
})

// Allows the html page and css styles to be rendered
app.set("view engine", "ejs");

// Makes the css and html files accessable
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));

// Recieves get request and renders landing page
app.get('/', (req,res) => {
    res.render('index')
})

// Renders about me page
app.get('/aboutme', (req, res) => {
    res.render('aboutme')
})

// Renders projects page
app.get('/projects', (req, res) => {
    res.render('projects')
})

// Renders contact page
app.get('/contactme', (req, res) => {
    res.render('contact')
})