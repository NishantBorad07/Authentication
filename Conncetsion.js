const { default: mongoose } = require("mongoose");

async  function  ConectDB(){

try {
    await mongoose.connect("mongodb+srv://boradnishant9:nishant1230@cluster0.oqxjwnp.mongodb.net/")
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error connecting to MongoDB");
}

   
}

module.exports = ConectDB;