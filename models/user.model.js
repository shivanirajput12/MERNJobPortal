import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["recruiter", "student"],
    required: true,
  },
  profile: {
    bio:{
        type: String,
    },
    skills:[{type: String}], 
    resume:{
        type: String, // URL or file path to the resume
    },  
    resumeOriginalName:{
        type: String, // Original file name of the resume
    },     
    company:{type:mongoose.Schema.Types.ObjectId, ref:"Company"}, // For recruiters 
    profilePhoto:{
        type: String, // URL or file path to the profile photo
        default:"",
    },  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
