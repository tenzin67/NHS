import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Make sure to import jwt or replace it with your preferred token library

const generateToken = (user) => {
    return jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Use Already Exists' });
    }
    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    // Save the user to the database, e.g., user.save()
    await user.save();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error. Please try again.' });
  }
  return res.status(200).json({ success: true, message: 'User created successfully' });
};


//.........LOGIN.........................

export const login = async (req, res) => {
  const { email,password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User is not found' });
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: false, message: 'Invalid Password' });
    }

    // Generate the token
    const token = generateToken(user);

    return res.status(200).json({ message: 'Successful login', token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
