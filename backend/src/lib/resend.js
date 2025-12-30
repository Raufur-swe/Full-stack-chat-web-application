
// sending email system
import {Resend} from "resend";
import { ENV } from "./env.js";


export const resendClient = new Resend(ENV.Resend_API_KEY);
export const sender ={
    email:process.env.EMAIL_FROM,
    sender:process.env.EMAIL_FROM_NAME,
};