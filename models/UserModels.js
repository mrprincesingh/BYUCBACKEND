const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please enter the name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:[true,"Email already exists"]
       
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[8,"Password should be at least 8 characters"],
        select:false,
    },
    cars:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CarModel"
        }
    ],
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },

})

userSchema.pre("save" , async function (next) {
    if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10)
    }
next()
})
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)


}

userSchema.methods.generateToken = function (){
return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

module.exports = mongoose.model("User",userSchema)