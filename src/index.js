require('dotenv').config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const PORT = process.env.API_PORT || 3000;

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/sendemail', (req, res) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: "Failed to send e-mail",
            })
        };
        return res.status(500).json({
            status: 202,
            message: "E-mail sucessfully sent",
        }) 
    });
});

app.listen(PORT, (req, res) => {
    console.log(`Listen port ${PORT}`);
});