import { CakeModel } from "../models/cakes.js";
import mongoose from "mongoose";
export const getAllCakes=async (req, res) => {
    //יש 3 צןרןת
    //1. res.send("get all cakes")
    //2. CakeModel.find({}).then(allCakes=>{
    //     res.json(allCakes);
    // }).catch(err=>{
    //     res.status(400).send(`error${err}`)
    // })
    //3.
    let {search}=req.query;
    let perPage=req.query.perPage||40;
    let page=req.query.page||1;
    let reg=new RegExp(`${search}$`)//תסתיים ב:

    try {
        let filter= {};
        if(search){
        filter.name=reg;
    }


        let allCakes = await CakeModel.find(filter)
         .skip((page-1)*(perPage))
         .limit(perPage)

         res.json(allCakes)
    }
    catch (err) {
        return res.status(400).send(`error1${err.message}`)
    }}

    export const getCakeById=async (req, res) => {
        try {
            if (!mongoose.isValidObjectId(req.params.id))
                return res.status(400).send("קוד לא תקין")
            let cake = await CakeModel.findById(req.params.id)
            if (!cake)
                return res.status(404).send("מצטערים אין עוגה עם קוד כזה")
            res.json(cake)
        }
        catch (err) {
            return res.status(400).send(`error2${err.message}`)
    
        }
    }

    export const deleteCakeById=async (req, res) => {
        let { id } = req.params;
        try {
            if (!mongoose.isValidObjectId(id))
                 return res.status(400).send("קוד לא תקין")
            let cake = await CakeModel.findByIdAndDelete(id)
            if (!cake)
                return res.status(404).send(" למחיקה מצטערים אין עוגה עם קוד כזה")
            return res.json(cake)
        }
        catch (err) {
            return res.status(400).send(`erro3r${err.message}`)
    
        }
    }
//למה אחרי שאני מוסיפה מאפה קיים 58  ובפקודה הבאה השרת קורס
    export const postCake=async (req, res) => {
        let { name, price, baker, ExpiryDate, isMilk } = req.body;
        if (!name || !price)
            return res.status(404).send(`חובה לשלוח שם ומחיר`)
        try {
            let sameCake = await CakeModel.find({ name, price });
            if (sameCake.length > 0)
                return res.status(409).send(`כבר קיים כזה מאפה עם שם ומחיר כזה`)
            let newCake = new CakeModel({ name, price, baker, ExpiryDate, isMilk });
            await newCake.save();
            res.json(newCake)
        }
        catch (err) {
            return res.status(400).send(`error4${err.message}`)
        }
    
    }

    export const putCakeById= async (req, res) => {
        let { id } = req.params;
        try {
            if (!mongoose.isValidObjectId(id))
                 return res.status(400).send("קוד לא תקין")
            let cakeToUpdate = await CakeModel.findById(id)
                if (!cakeToUpdate)
                     return res.status(404).send(" לעדכון מצטערים אין עוגה עם קוד כזה")
            // cake.name = req.body.name || cake.name;
            // cake.price = req.body.price || cake.price;
            // cake.baker = req.body.baker || cake.baker; 
            // cake.ExpiryDate = req.body.ExpiryDate || cake.ExpiryDate;
            // cake.isMilk = req.body.isMilk || cake.isMilk;
    
            // await cake.save();;
            // res.json(cake)
    
             await CakeModel.findByIdAndUpdate(id, req.body)
            let cake= await CakeModel.findById(id)
            return res.json(cake)
        }
        catch (err) {
            return res.status(400).send(`erro5r${err.message}`)
    
        }
    
    }

    