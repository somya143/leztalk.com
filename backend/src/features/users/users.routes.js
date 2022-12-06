const express = require('express');
const app = express.Router();
const Users = require('./users.model');
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const cors = require("cors");
  app.use(cors())


app.post('/signup', async(req,res) => {
 const {name , email , password , age} = req.body;
 const token = req.headers["authorization"]; 
 const hash = await argon2.hash(password);

 try {
    if(token){
        const decoded = jwt.decode(token ,"SECRETKEY@1996" );
        if(decoded && decoded.role === "admin"){
            const user = new Users({name , email , password:hash , age , role: "groupUser"});
            await user.save() ;
            return res.status(201).send("groupUser created successfully")
        }else{
         return   res.status(403).send("you are not allowed to create groupUser")
        }
    }
    
   
} catch (error) {
   return res.status(401).send("non admin user tried to create groupUser")
}

const user = new Users({name , email , password:hash , age});
await user.save() ;

return res.status(201).send("User created successfully")
});

app.post("/login" , async (req,res) => {
    const {email , password} = req.body;
    
    try {
        const user = await Users.findOne({email});
          const matched = await argon2.verify(user.password , password)
           if(matched){
          const token = jwt.sign({id:user.id ,name:user.name ,email : user.email ,age: user.age,role:user.role} , "SECRETKEY@1996" , {expiresIn : "7 days"})
         
         const refreshToken = jwt.sign({id:user.id ,name:user.name ,email : user.email ,age: user.age,role:user.role}, "REFRESHKEY1996", {expiresIn: "28 days"})
          res.send({message: "Login success",token , refreshToken})     
        }
    } catch (error) {
        res.status(401).send("Invalid credentials")

    }
});

module.exports = app;
