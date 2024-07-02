 const express = require("express")
const ConectDB = require("./Conncetsion")
const userController = require("./Controller/UserController")
const dotenv = require("dotenv");
 const app = express()
ConectDB()

dotenv.config()
app.use(express.json())

app.get("/",(req, res) => {
    res.send("hello world")
})


app.post("/",userController.RegisterUser)
app.post("/login",userController.UserLogin)

 app.listen(5500, (req,res) =>{
    console.log("listening on");
 })