const { default: mongoose, } = require("mongoose");

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
          firstname: { type: "string", required: true },
            lastname: { type: "string", required: true },
            email: { type: "string", required: true },
            password: { type: "string", required: true },
            isAdmin: { type: "boolean", default: false }
           }, {timestamps:true})

             this.model = mongoose.model("tbl_Reusers",this.schema)
    }
    CreateUser(data){
        return this.model.create(data)
    }
}

const userModel = new UserModel()
module.exports= userModel





// const { default: mongoose } = require("mongoose");

// class UserModel {
//     constructor() {
//         this.schema = new mongoose.Schema({
//             firstname: { type: "string", required: true },
//             lastname: { type: "string", required: true },
//             email: { type: "string", required: true },
//             password: { type: "string", required: true },
//             isAdmin: { type: "boolean", default: false }
//         }, { timestamps: true });

//         this.model = mongoose.model("tbl_Reusers", this.schema);
//     }

//     CreateUser(data) {
//         return this.model.create(data);
//     }
// }

// const userModel = new UserModel();
// module.exports = userModel;
