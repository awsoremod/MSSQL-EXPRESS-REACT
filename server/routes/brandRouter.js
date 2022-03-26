const Router = require('express');
const router = new Router();
let brandController = require('../controllers/brandController');

router.post('/', brandController.create);
router.get('/', brandController.getAll.bind(brandController));

module.exports = router;
