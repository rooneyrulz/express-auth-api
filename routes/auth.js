const { Router } = require('express');
const isAuth = require('../middleware/is-auth');

const router = new Router({ strict: true });

// Controllers
const { signUp, logIn, authUser } = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/user', isAuth, authUser);

module.exports = router;