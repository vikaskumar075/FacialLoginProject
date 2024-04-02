import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import * as faceapi from "face-api.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, faceDescriptor } = req.body;
    // console.log(faceDescriptor);
    if(!email || !username){
      return res.status(404).json({message: "Enter email or password"})
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already Existed" });
    }

    const newUser = new User({
      username,
      email,
      faceData: faceDescriptor,
    });
    await newUser.save();
    return res.status(200).json({ status: true, message: "Register SuccessFully" });
  } catch (error) {
    console.log(error);
  }
});

//Log in
router.post("/login", async (req, res) => {
  try {
    const { email,faceDescriptor } = req.body;
//  console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    const thresholdValue = 0.4;
    if (faceDescriptor.length > 0) {
      const distance = faceapi.euclideanDistance(faceDescriptor, user.faceData);
      if (distance <= thresholdValue) {
        const token = jwt.sign({ username: user.username }, process.env.KEY, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

        return res.status(200).json({
          message: "User found",
          user,
        });
      }
    }

    return res.status(401).json("Face is not matched");
  } catch (error) {
    console.log(error.message);
  }
});
// module.exports =router;
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});
export { router as UserRouter };
