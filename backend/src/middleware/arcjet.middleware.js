// creat a arject middleware befor login or signup action for bot detection

import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decition = await aj.protect(req);
        if (decition.isDenied()) {
            if (decition.reason.isRateLimit()) {
                return res.status(429).json({ massage: "Rate limit exceeded . Please try again latter." });
            } else if (decition.reason.isBot()) {
                return res.status(403).json({ massage: "Bot access denied." });
            } else {
                return res.status(403).json({
                    massage: "Access denied by security policy."
                })
            }
        }

        // check spoof bot(spoof = pretend to be human)
        if (decition.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoof bot detected",
                massage: "Malicious bot activity detected"
            });
        }

        next()
    } catch (error) {

    console.error("Arcjet middleware error:", error)
    return res.status(500).json({
     massage: "Internal security error"
    })
    }
}