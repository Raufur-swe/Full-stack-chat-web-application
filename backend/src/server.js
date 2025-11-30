import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import massageRoute from "./routes/massage.route.js"





dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express()

//auth route
app.use("/api/auth" , authRoute);
//massages route
app.use("/api/massage" , massageRoute);




app.listen(PORT , ()=>console.log("Server running on port:", +PORT));


