import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

// schema definition
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a name'],
    minLength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Please provide an email address'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password mast be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['admin', 'subscriber'],
    default: 'subscriber',
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

// define model
const User = mongoose.model('User', userSchema);

export default User;