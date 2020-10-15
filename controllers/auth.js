const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const isUserExist = await User.findOne({ email }).lean();
    if (isUserExist)
      return res.status(409).send('Email has already been taken!');

    const hashedPWD = await bcrypt.hash(password, 12);
    const user = await new User({ email, password: hashedPWD }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 360000,
    });
    res
      .status(201)
      .json({ token, user: { ...user._doc, password: undefined } });
    return Promise.resolve();
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
    return Promise.reject();
  }
};
const logIn = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).send('User does not exist!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials!');

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 360000,
    });
    res.status(200).json({ token, user: { ...user, password: undefined } });
    return Promise.resolve();
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
    return Promise.reject();
  }
};
const authUser = async (req, res, next) => {
  const { id, iat, exp } = req.user;
  try {
    const user = await User.findById(id).lean();
    res.status(200).json({ user: { ...user, password: undefined, iat, exp } });
    return Promise.resolve();
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
    return Promise.reject();
  }
};

module.exports = { signUp, logIn, authUser };
