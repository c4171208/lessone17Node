import jwt from "jsonwebtoken"
export const auth=async (req,res,next)=>{
let token=req.headers["my-token"];
if(!token)
return res.status(401).json({type:"not authorized",message:"user not authorized"});
try{
let isOk=jwt.verify(token,process.env.JWT_STRING)
req.user=isOk;
// if(!isOk)
//     return res.status(401).json({type:"not ok token",message:"not ok token"});

//????????????????כאן זה נופל למה
 next();
 }
 catch(err){
    return res.status(401).json(`erorr##${err.message}`);

 }

 }

 export const authAdmin=async (req,res)=>{
    let token=req.headers["x-access-token"];
    if(!token)
    return res.status(401).json({type:"not authorized",message:"user not authorized"});
    try{
    let isOk=jwt.verify(token,process.env.JWT_STRING)
    req.user=isOk;
     if(isOk.role=="ADMIN")
        next();
     return res.status(403).json(`erorr##${err.message}`);

    //????????????????כאן זה נופל למה
     
     }
     catch(err){
        return res.status(401).json({type:"not authorized",message:"user not authorized"});
    
     }
    
     }
