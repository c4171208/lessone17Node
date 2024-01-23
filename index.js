import express  from "express";
import { config } from "dotenv";
import morgan from "morgan";


import cakeRouter from "./routes/cake.js"
import mongoose from "mongoose";
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
app.use(morgan("common"))//מדפיס כל בקשה שמגיעה לשרת בפורמט מסוים לטרמינל

// app.use((err,req,res,next)=>
// {
//   console.error(err.stack)
//   let stat=res.stat?res.stat:500;
//   res.status(stat).send(err.message||"error in server")  
// });


app.use("/api/cake",cakeRouter)




let port=process.env.PORT || 3500;
app.listen(port,()=>{console.log(`app is listening on port ${port}`);})
