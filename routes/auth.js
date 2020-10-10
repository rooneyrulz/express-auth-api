const { Router } = require('express');
const router = new Router({ strict: true });

// Controllers
const { signUp, logIn, authUser } = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/user', authUser);

module.exports = router;