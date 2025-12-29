import mongoose, { connect } from "mongoose"

//connect database or creat a connection of database
export const connectDB = async ()=>{
    try {
     const connect =   await mongoose.connect(process.env.MONGO_URl)
        console.log("Database connect successfully: ", connect.connection.host)
    } catch (error) {
        console.error("Error connection : ", error)
        process.exit(1) // 1 mean faild 0 mean success
    }
}