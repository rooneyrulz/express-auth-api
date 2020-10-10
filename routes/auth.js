const { Router } = require('express');
const router = new Router({ strict: true });

router.post('/signup', (req, res, next) => res.send('Signup!!'));
router.post('/login', (req, res, next) => res.send('Login!!'));
router.get('/user', (req, res, next) => res.send('Auth User!!'));

module.exports = router;