const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token') ?
        req.header('x-auth-token').split(' ')[1] :
        null;
    if (!token) {
        req.isAuth = false;
        req.user = null;
        console.log('Token is null!');
        return res.status(401).send('Unauthorized!');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        req.isAuth = false;
        req.user = null;
        console.log(error.message);
        return res.status(401).send('Unauthorized!');
    }

    if (!decoded) {
        req.isAuth = false;
        req.user = null;
        console.log('Decoded token is null!');
        return res.status(401).send('Unauthorized!');
    }

    req.isAuth = true;
    req.user = decoded;
    return next();
};