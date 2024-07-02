
// const { request } = require('express');
const userModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")



class UserController {

    async  RegisterUser(req,res){
     try {
        const {password}= req.body
        if(!password) return res.status(400).send({message:"Missing password"})
          const  enpassword =bcrypt.hashSync(password,8)
        req.body.password = enpassword
          if(!enpassword) return res.status(400).send({message:"Missing password"})
          
       let result = await userModel.CreateUser(req.body)
        
          if(!result) return res.status(400).send({message:"something went wrong"})
            result =result._doc
          delete result.password   
       
          const token  = jwt.sign(result, process.env.JWT_SECRET, {
            expiresIn:"30d"
          })
        if(!token) return result.status(400).send({message:"Something went wrong"})
          return res.status(200).send({message:"success",data:result,token:token})

     } catch (error) {
       console.log(error);
     }
    }


     async UserLogin(req,res){
        try {
          
          const {email,password} = req.body;
          if(!email || !password) return res.status(400).send({message:"Missing Dependency"});
           
          let result = await  userModel.model.findOne({email: email})
              if(!result) return res.status(400).send({message:"invalid email"})
                 result = result._doc
                if(!bcrypt.compareSync(password, result.password)) return res.status(400).send({message:"invalid password"})
                delete result.password


                const token = jwt.sign(result, process.env.JWT_SECRET,{
                  expiresIn:"30d"
                })

                if(!token) return res.status(500).send({message:"Something went wrong"})
                   result ={
                  firstname: result.firstname,
                 lastname: result.lastname,
                 email: result.email,
                }

                 return res.status(200).send({message:"success",data:result,token:token})
        } catch (error) {
          console.log(error);
          return res.status(500).send({message:"INTERNAL SERVER ERROR",})
        }
     }


}

const userController = new UserController();
module.exports = userController;