const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/add', basketController.add);
router.get('/', basketController.getAll);
router.delete('/', basketController.deleteDevice);

module.exports = router;
