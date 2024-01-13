const router = require('express').Router();

const testRouter = require('./test');
const authRouter = require('./users');

router.use('/', testRouter);
router.use('/auth', authRouter);
// router.use('/blog', blogRouter);

module.exports = router;
