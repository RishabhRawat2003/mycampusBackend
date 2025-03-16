import nodemailer from 'nodemailer';

export const packageBoughtByUser = async (email, message, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // ✅ Use Gmail service
            auth: {
                user: process.env.EMAIL_USER, // ✅ Your Gmail address
                pass: process.env.EMAIL_PASS  // ✅ Your Gmail App Password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // ✅ Must match your Gmail address
            to: email, // ✅ Recipient email
            subject: subject,
            text: message,
            replyTo: email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};
