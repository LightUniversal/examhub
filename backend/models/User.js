import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// create a user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// create a method to check if password match during login
userSchema.methods.checkPasswordMatch = async function (sentPassword) {
  return await bcrypt.compare(sentPassword, this.password);
};

// hash the password during registeration
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //generate salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}, );

// create a model
const User = mongoose.model("User", userSchema);
export default User;
