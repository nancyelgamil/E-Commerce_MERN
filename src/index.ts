import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;  //Express Port

app.use(express.json())
//Connection to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

app.use('/user', userRoute)

//express listen port
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
})