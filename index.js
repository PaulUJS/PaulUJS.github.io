const express = require("express");
const res = require("express/lib/response");
const { send, sendStatus, json } = require("express/lib/response");
const { dirname } = require("path");
const path = require("path");
const nodemailer = require("nodemailer");


// Makes the express app
const app = express();

app.listen("3000", () => {})

// Gets form info from html forms and reads as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Runs once contactme form is submitted and sends an email to me with the forms content
app.post('/contactme', (req, res) => {
    // Grabs the html form data and parses it
    let email = JSON.stringify(req.body.email)
    let subject = JSON.stringify(req.body.subject)
    let message = JSON.stringify(req.body.message)
    
    // Calls function that sends the email
    mail(email, subject, message);
    
    res.redirect('/')
})

// Function that grabs the html submitted in the email form and sends an email with that content to me
async function mail(email, subject, message) {
    // creates the email object that will be sending reminder emails
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVICE,
            pass: process.env.EMAIL_PASS
        },
    });

    // send mail with defined transport object
    let email_details = await transporter.sendMail({
        from: email, // sender address
        to: process.env.EMAIL_SERVICE, // My email
        subject: subject, // Subject line
        text: message, // plain text body
        html: message
    });

}

