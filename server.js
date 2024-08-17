const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle order form submission
app.post('/order', (req, res) => {
    const { product, quantity, email } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Order Received',
        text: `A new order has been placed.\n\nProduct: ${product}\nQuantity: ${quantity}\nCustomer Email: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Order placed successfully.');
        }
    });
});

// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Here you should handle signup logic, like storing user details in a database
    // For now, we'll just send an email confirmation

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Sign Up Confirmation',
        text: `Hello ${name},\n\nThank you for signing up! Your account has been created.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Sign up successful! Please check your email for confirmation.');
        }
    });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Here you should handle login logic
    // For now, we'll just send a dummy response

    res.send('Login successful!');
});

// Route to handle forgot password form submission
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Hello,\n\nWe received a request to reset your password. Please follow the instructions in the email to reset your password.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Password reset instructions sent to your email.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});