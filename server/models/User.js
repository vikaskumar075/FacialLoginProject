import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  faceData:{
    type: Array,
    required: true,
  }
});
const UserModel = mongoose.model("User", UserSchema);
// module.exports= UserModel;
export { UserModel as User };
