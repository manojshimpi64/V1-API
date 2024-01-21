const mongoose = require('mongoose');
const { Schema} = mongoose
const UserSchema = new Schema({
  fullname:{
   type:String,
   required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
 password:{
   type:String,
   required:true
},
 type:{
    type:String
 },
  date:{
    type:Date,
    default:Date.now
  }
});

const User = mongoose.model('users',UserSchema)

module.exports = User;