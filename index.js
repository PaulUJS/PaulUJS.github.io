const nodemailer = require("nodemailer");
require("dotenv").config();

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const EMAIL_PASS = process.env.EMAIL_PASS

// Function that grabs the html submitted in the email form and sends an email with that content to me
async function mail() {
    let email = document.getElementsByName("email")
    let subject = document.getElementsByName("subject")
    let message = document.getElementsByName("message")

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

