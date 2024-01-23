import {User, userValidatorForLogin, userValidatorForSign}from"../models/user.js"
export const addUser=async (req,res)=>{
//     let{name,password,tz,email}=req.body;
//     if(!name||!password||!tz||!email)
//        return res.status(404).json({type:"missing parametes",message:"missing oarametrs"})
//    if(!/[0-9]{1,2}/.test(password))
//      return res.status(400).json({type:"invalid password",message:"invalid password in sign in"})
let{name,password,tz,email}=req.body;
let validate = userValidatorForSign(req.body);
if (validate.error)
    return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });

try{
    let sameUser=await User.findOne({$or:[{name},{tz}]})
    if(sameUser){
      console.log("name "+name);
      return res.status(409).json({type:"same user",message:"missing same user"})}
    let newUser= new User({name,tz,password,email})
    await newUser.save();
    return res.json(newUser);}
    catch (err) {
        return res.status(400).send(`error9${err.message}`)
    }
}

export const login=async(req,res)=>{
    console.log("enter to log");
//  let {password,name}=req.body;
//  if(!name||!password)
//     return res.status(404).json({type:"missing1 parametes",message:"missing oarametrs"})
let validate=userValidatorForLogin(req.body) ;
let{name,password,tz,email}=req.body;

if(validate.error)     
  return res.status(400).json({type:"not valid",message:validate.error.details[0].message})
    try{
        let user=await User.findOne({$or:[{name,password}]})
        if(!user)
            return res.status(404).json({type:"no such user",message:"sign in!!!"})
        user.password="****";
        return res.json(user);
    }
catch(err){
   
        return res.status(400).send(`error10${err.message}`)
    }

}
    