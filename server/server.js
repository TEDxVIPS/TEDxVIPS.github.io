const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Email transporter config
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Form validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'your-tedx-email@example.com',
    subject: `TEDx Contact Form: Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
    
    console.log('Email sent:', info.response);
    res.json({ success: true, message: 'Your message has been sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
