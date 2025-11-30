import express from "express"
import dotenv from "dotenv"
import path from "path"
import authRoute from "./routes/auth.route.js"
import massageRoute from "./routes/massage.route.js"
import  {connectDB}  from "./lib/db.js"


dotenv.config();
const app = express()
app.use(express.json())// req body and must be on top
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;
// req body and must be on top


//auth route
app.use("/api/auth" , authRoute);
//massages route
app.use("/api/massage" , massageRoute);




if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Only GET requests fallback
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


app.listen(PORT , ()=>{
    console.log("Server running on port:", +PORT)
    connectDB()
});