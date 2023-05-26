const mongoose  = require("mongoose");

const CarSchema = mongoose.Schema({
    carName:{
        type:String,
        required:[true , "Please enter the Carname"],
        trim:true
    },
    modelName:{
        type:String,
        required:[true , "Please enter the ModelName"],
        
    },
    engine:{
        type:Number,
        required:[true , "Please enter the Engine in CC"]
    },
    mileage:{
        type:Number,
        required:[true , "Please enter the Mileage in KM"]
    },
    transmission:{
        type:String,
        required:[true , "Please enter the Transmission"]
    },
    YearOfModel:{
        type:String,
        required:[true , "Please enter the YearOfModel"]
    },
    price:{
        type:Number,
        required:[true , "Please enter the Price"]
    },
    color:{
        type:String,
        required:[true , "Please enter the Color"]
    },
    BHP:{
        type:Number,
        required:[true , "Please enter the BHP"]
    },
    MaxSpeed:{
        type:Number,
        required:[true , "Please enter the MaxSpeed"]
    },
    FuleType:{
        type:String,
        required:[true , "Please enter the FuleType"]
    },
    KMonOdometer:{
        type:Number,
        required:[true , "Please enter the KMonOdometer"]
    },
    MajorScratches:{
        type:String,
        required:[true , "Please mention about MajorScratches"]
    },
    OrignalPaint:{
        type:String,
        required:[true , "Please mention about OrignalPaint"]
    },
    Numberofaccidents:{
        type:Number,
        required:[true , "Please mention about Numberofaccidents"]
    },
    Numberofpreviousbuyers:{
        type:Number,
        required:[true , "Please mention about Numberofpreviousbuyers"]
    },
    RegistrationPlace:{
        type:String,
        required:[true , "Please mention about RegistrationPlace"]
    } ,
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
discription:{
    type:String,
    required:[true , "Please mention the discription"]
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
CreatedAt:{
    type:Date,
    default:Date.now(),
}

})

module.exports = mongoose.model("CarModel",CarSchema)