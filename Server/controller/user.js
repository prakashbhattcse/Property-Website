const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const registerUser = async (req, res) => {
  const { name, email, password, isOwner } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ name, email, password, isOwner });
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isOwner: user.isOwner,
    token: generateToken(user._id),
  });
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isOwner: user.isOwner,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};




const checkLoginStatus = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (user) {
      return res.json({ isLoggedIn: true, user });
    } else {
      return res.status(401).json({ isLoggedIn: false });
    }
  } catch (error) {
    return res.status(401).json({ isLoggedIn: false });
  }
};

module.exports = { registerUser, loginUser, checkLoginStatus };



