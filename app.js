import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";


//import rotes
import userRoute from "./routes/user.js";
import customerRoute from "./routes/customer.js";
import adminRoute from "./routes/admin.js";

dotenv.config({ path: './config.env' })
const port = process.env.PORT || '5000';
// const DATABASE_URL = "mongodb://103.190.242.94:27017"
const DATABASE_URL = "mongodb+srv://pratham:lookman17@cluster1.vuxzs.mongodb.net/?retryWrites=true&w=majority"
// mongodb+srv://pratham:lookman17@cluster1.vuxzs.mongodb.net/?retryWrites=true&w=majority
// 103.190.242.94:27017
connectDB(DATABASE_URL)
export const app = express()

//  app.use(cookieParser())
app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: true }));

//rout
app.use('/api', userRoute);
app.use('/api', customerRoute);
app.use('/api', adminRoute);



app.listen(port, () => {
    console.log(`local host:${port}`)
});
