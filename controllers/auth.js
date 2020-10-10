const signUp = (req, res, next) => res.send('Signup');
const logIn = (req, res, next) => res.send('Login');
const authUser = (req, res, next) => res.send('AuthUser');

module.exports = { signUp, logIn, authUser };