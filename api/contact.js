// This is a Vercel serverless function
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Get form data
        const { name, email, message } = req.body;
        
        // Validate form data
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Set up nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'official.tedxvips@gmail.com', // Updated email address
            subject: `TEDx Contact Form: ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                
                Message:
                ${message}
            `
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        // Return success response
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
