import nodemailer from 'nodemailer'

export const packageBoughtByUser = async (email, message, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: subject,
            text: message,
            replyTo: email
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error; // Ensure errors can be handled by the caller
    }
};