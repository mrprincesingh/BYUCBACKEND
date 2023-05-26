const CarModel = require("../models/CarModels");
const User = require("../models/UserModels");
const cloudinary= require("cloudinary");
const ApiFeatures = require("../utils/apifeatures");
const UserModels = require("../models/UserModels");
exports.createCar = async (req, res) => {
  try {
    const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Cars",
      width:150,
      crop:"scale",
    });
    const newCarData = {
      carName:req.body.carName,
      modelName:req.body.modelName,
      engine:req.body.engine,
      mileage:req.body.mileage,
      transmission:req.body.transmission,
      YearOfModel:req.body.YearOfModel,
      price:req.body.price,
      color:req.body.color,
      BHP:req.body.BHP,
      MaxSpeed:req.body.MaxSpeed,
      FuleType:req.body.FuleType,
      KMonOdometer:req.body.KMonOdometer,
      MajorScratches:req.body.MajorScratches,
      OrignalPaint:req.body.OrignalPaint,
      Numberofaccidents:req.body.Numberofaccidents,
      Numberofpreviousbuyers:req.body.Numberofpreviousbuyers,
      RegistrationPlace:req.body.RegistrationPlace,
      discription:req.body.discription,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
    const newCar = await CarModel.create(newCarData);
    const user = await User.findById(req.user._id);
    user.cars.push(newCar._id);
    await user.save();
    res.status(201).json({ success: true, newCar });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deletePost = async (req,res) => {
  try{
    let car  = await  CarModel.findById(req.params.id);
    if(!car) {
      return res.status(401).json({success: false,message:"Car not found"});
    }

    if(car.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({success: false,message:"Unauthorized"});
    }
    car =  await CarModel.findByIdAndDelete(req.params.id,req.body)
    const user  = await User.findById(req.user._id)
    const index = user.cars.indexOf(req.params._id)
    user.cars.splice(index,1)
    await user.save()
    res.status(200).json({
      success: true,
      message:"Car Deleted Successfully"
      })

  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
exports.EditPost = async (req,res) => {
try{
  let car  = await  CarModel.findById(req.params.id);
  if(!car) {
    return res.status(401).json({success: false,message:"Car not found"});
  }
  if(car.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({success: false,message:"Unauthorized"});
  }
  car =  await CarModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success: true,
    car
})
}catch(err){
  res.status(500).json({
    success: false,
    message: err.message,
  });
}
}

exports.GetallCars = async (req,res)=>{
 const apifeatures= new ApiFeatures(CarModel.find(),req.query).search().filter()
  const Car = await apifeatures.query
  res.status(200).json({success: true,Car})
}

exports.getProductDetails= async(req,res)=>{
  const car= await CarModel.findById(req.params.id);

  if(!car){
    return res.status(401).json({success: false,message:"Car not found"});
  }

  res.status(200).json({
      success: true,
      car,
  })

}

exports.getUserCarPost = async(req , res)=>{
  const userdata = await User.findById(req.user._id).populate("cars")
  res.status(200).json({
    success: true,
    userdata,
})


}

