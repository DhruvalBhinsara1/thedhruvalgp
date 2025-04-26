const nodemailer = require('nodemailer');

// Configure the transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

module.exports = async (req, res) => {
    // Ensure we always return JSON
    res.setHeader('Content-Type', 'application/json');

    try {
        // Only allow POST requests
        if (req.method !== 'POST') {
            console.log('Method not allowed:', req.method);
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // Debug logs
        console.log('Received request:', req.body);
        console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL);
        console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '[REDACTED]' : 'undefined');

        const { name, email, subject, priority, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            console.log('Missing required fields:', { name, email, message });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate environment variables
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.log('Environment variables missing:', {
                SMTP_EMAIL: process.env.SMTP_EMAIL,
                SMTP_PASSWORD: process.env.SMTP_PASSWORD ? '[REDACTED]' : 'undefined',
            });
            return res.status(500).json({ error: 'Server configuration error: Missing SMTP credentials' });
        }

        // Email options
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: 'your-personal-email@example.com', // Replace with a test email
            replyTo: email,
            subject: `${subject} - Priority: ${priority}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nPriority: ${priority}\nMessage: ${message}`,
            html: `
                     <h2>New Contact Form Submission</h2>
                     <p><strong>Name:</strong> ${name}</p>
                     <p><strong>Email:</strong> ${email}</p>
                     <p><strong>Subject:</strong> ${subject}</p>
                     <p><strong>Priority:</strong> ${priority}</p>
                     <p><strong>Message:</strong> ${message}</p>
                 `,
        };

        console.log('Attempting to send email with options:', mailOptions);

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error in /api/send-email:', error.message, error.stack);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};