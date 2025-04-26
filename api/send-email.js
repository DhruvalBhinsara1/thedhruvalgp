const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, subject, priority, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Set up Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_EMAIL, // Your Gmail address
            pass: process.env.SMTP_PASSWORD // App Password from Gmail
        }
    });

    // Email content
    const mailOptions = {
        from: `"TheDhruvalGP Contact" <${process.env.SMTP_EMAIL}>`,
        to: process.env.SMTP_EMAIL, // Send to yourself
        subject: `New F1 Message - ${subject}`,
        text: `
            From: ${name} (${email})
            Pit Stop Priority: ${priority}
            Message: ${message}
        `,
        html: `
            <h3>New F1 Message - ${subject}</h3>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Pit Stop Priority:</strong> ${priority}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send message' });
    }
}