require("dotenv").config();
const nodeMailer = require("nodemailer");

const sendEmail = async (req, res) => { 
    try {
        const { name, email, subject, message } = req.body;

        if( !name || !email || !subject || !message ) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New contact form submission: ${subject}`,
            replyTo: email,
            html: `
                <p><strong>Name:</strong>${name}</p>
                <p><strong>Email:</strong>${email}</p>
                <p><strong>Subject:</strong>${subject}</p>
                <p><strong>Message:</strong>${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.log("Error sending email", error);
        res.status(500).json({ msg: "Server error" });
    }
}

module.exports = sendEmail;