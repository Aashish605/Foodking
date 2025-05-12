import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const loginSchema = new mongoose.Schema({
  Gmail: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    unique: true,
  },
});

loginSchema.plugin(passportLocalMongoose);
const Login = mongoose.model("Login", loginSchema);
export default Login;
