import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
}

// Encrypt password using bcrypt
// check does the password value is changed, if so generate new hash else move to the next
// middle ware operation

userSchema.pre("save", async function(next){
  if(!this.isModified('password')){
     next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password,salt);
})

const User = mongoose.model('User', userSchema);

export default User;

// this.password to access its own properties this keyword is used.