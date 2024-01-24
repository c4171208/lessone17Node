import jwt  from "jsonwebtoken";

export const generateToken=(user)=>{
    let jwtSecretKey = process.env.JWT_STRING;
    let data = {
       role:user.role,
       name:user.name,
       _id:user._id
    }
 
    const token = jwt.sign(data,jwtSecretKey,  {
        expiresIn: '5m'
        
    });

    return token;

}