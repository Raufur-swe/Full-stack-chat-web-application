
// welcome email handeller

import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTempletes.js"


export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name}<${sender.email}>`,
        to: email,
        subject: "Welcome to chatyfy!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });
    if (error) {
        console.error("Error sending welcome email: ", email);
        throw new Error("Failed to send welcome email");
    }
    console.log("Welcome email send successfully", data);
};