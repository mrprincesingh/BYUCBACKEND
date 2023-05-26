
const User = require("../models/UserModels");
const cloudinary= require("cloudinary");
exports.register = async (req, res) => {
  try {
    const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width:150,
      crop:"scale",
    });
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url:  myCloud.secure_url },
    });

    const token = await user.generateToken();
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email & password" });
    }
    const token = await user.generateToken();
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.Logout = async (req,res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
}

// exports.GetallCars = async (req,res)=>{
  
//    const Car = await CarModel.find()
//    res.status(200).json({success: true,Car})
//  }


