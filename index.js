const express = require("express");
const res = require("express/lib/response");
const { send, sendStatus, json } = require("express/lib/response");
const { dirname } = require("path");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const EMAIL_PASS = process.env.EMAIL_PASS

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
    res.sendFile(path.join(__dirname, "/index"))
})

// Renders about me page
app.get('/aboutme', (req, res) => {
    es.sendFile(path.join(__dirname, "/aboutme"))
})

// Renders projects page
app.get('/projects', (req, res) => {
    es.sendFile(path.join(__dirname, "/projects"))
})

// Renders contact page
app.get('/contactme', (req, res) => {
    es.sendFile(path.join(__dirname, "/contact"))
})

// Runs once contactme form is submitted and sends an email to me with the forms content
app.post('/contactme', (req, res) => {
    // Grabs the html form data and parses it
    let email = req.body.email
    let subject = JSON.stringify(req.body.subject)
    let message = JSON.stringify(req.body.message)
    
    // Calls function that sends the email
    mail(email, subject, message);
    
    res.redirect('/')
})

// Function that grabs the html submitted in the email form and sends an email with that content to me
async function mail(email, subject, message) {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_SERVICE,
                pass: EMAIL_PASS
            }
        })

        const mail_options = {
            from: EMAIL_SERVICE,
            to: EMAIL_SERVICE,
            subject: subject,
            text: `You have recieved an email from ${email} saying: ${message}`
        }

        const result = await transport.sendMail(mail_options)
        console.log('email has been sent successfully')
        return result
    }
    catch (err) {
        console.log(err)
        return err
    }
}

