import jwt from 'jsonwebtoken';
import Joi from "joi";
import User from '../models/User.js';

class AuthController {
  constructor() {
    this.register = this.register.bind(this);
    this.login    = this.login.bind(this);
  }

  async register(req, res) {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).validate(req.body);

    if(error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    try {
      const { name, email, password } = req.body;
      
      // email existance checking
      const isUserExist = await User.findOne({ email });
      if(isUserExist) {
        return res.status(400).json({ message: 'Email already exist' });
      }

      // save new user
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: 'Registration success.' });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    // input validation
    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).validate(req.body);

    if(error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isMatched = await user.verifyPassword(password);
      if (!isMatched) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const { _id: id, name } = user;

      // Generate JWT token
      const token = jwt.sign({ user: { id, name, email } }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.status(201).json({ token });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();