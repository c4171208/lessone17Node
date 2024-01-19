import mongoose from "mongoose";

const BakerSchema=mongoose.Schema({
    name:String,
    phone:String,
    tz:String,
    startDade:{type: Date ,default:Date.now()}
})


const CakeSchema=mongoose.Schema({
    
    name:String,
    isMilk:Boolean,
    ExpiryDate:Date,
    productionDate:{type:Date,default:Date.now()} ,
    ///??????????????????????????????????????????????
    price:Number,
    baker:BakerSchema
})

export  const  CakeModel=mongoose.model("cakes",CakeSchema)