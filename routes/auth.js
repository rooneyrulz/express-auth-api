const { Router } = require('express');
const { check } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const router = new Router({ strict: true });

// Controllers
const { signUp, logIn, authUser } = require('../controllers/auth');

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('invalid email'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long'),
  ],
  signUp
);
router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('invalid email'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long'),
  ],
  logIn
);
router.get('/user', isAuth, authUser);

module.exports = router;
