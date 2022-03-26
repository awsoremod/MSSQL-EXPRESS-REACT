const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const adminRouter = require('./adminRouter');
const basketRouter = require('./basketRouter');
const userRouter = require('./userRouter');

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
