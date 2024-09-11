import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// create the Mongoose schema with additional options and features
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


// pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(error) {
    next(error)
  }
});

// Instance method to verify the password
userSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// create and export the model
const User = mongoose.model('User', userSchema);

export default User;