const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const signUp = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email.trim()) return res.status(400).send('Email is required!');
    if (!password.trim()) return res.status(400).send('Password is required!');
    try {
        const isUserExist = await User.findOne({ email }).lean();
        if (isUserExist)
            return res.status(400).send('Email has already been taken!');

        const hashedPWD = await bcrypt.hash(password, 12);
        const user = await new User({ email, password: hashedPWD }).save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: 360000,
        });
        res
            .status(201)
            .json({ token, user: {...user._doc, password: undefined } });
        return Promise.resolve();
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
        return Promise.reject();
    }
};
const logIn = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email.trim()) return res.status(400).send('Email is required!');
    if (!password.trim()) return res.status(400).send('Password is required!');
    try {
        const user = await User.findOne({ email }).lean();
        if (!user) res.status(400).send('User does not exist!');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).send('Invalid credentials!');

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: 360000,
        });
        res.status(200).json({ token, user: {...user, password: undefined } });
        return Promise.resolve();
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
        return Promise.reject();
    }
};
const authUser = async(req, res, next) => res.send('AuthUser');

module.exports = { signUp, logIn, authUser };