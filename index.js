import express  from "express";
import { config } from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cakeRouter from "./routes/cake.js"
import userRouter from "./routes/user.js"

import { middleWare } from "./middleWares/middleWare.js";
config();

const app=express();

const mongoDB=process.env.DB_CONNECTION ||"mongodb://localhost:27017";

//התחברות למסד נתונים
mongoose.connect(`${mongoDB}/${process.env.DB_NAME||"kondeturia"}`).then(suc=>{
    console.log(`mongo DB conected ${suc.connection.host}`);
}).catch(err=>{
    console.log(err);
    console.log(`canot conect mondo DB`);
    process.exit(1);

})

app.use(express.json());
app.use(cors({origin:"file:///C:/node.js/lessone16/html.html",methods:"*"}))
app.use(morgan("common"))//מדפיס כל בקשה שמגיעה לשרת בפורמט מסוים לטרמינל

app.use("/api/cake",cakeRouter)
app.use("/api/user",userRouter)

app.use(middleWare)



let port=process.env.PORT || 3500;
app.listen(port,()=>{console.log(`app is listening on port ${port}`);})
