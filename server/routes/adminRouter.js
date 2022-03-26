const Router = require('express');
const adminController = require('../controllers/adminController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.get('/auth', authMiddleware, adminController.check);
router.get('/type', authMiddleware, adminController.getTypes);
router.get('/brand', authMiddleware, adminController.getBrands);

module.exports = router;
