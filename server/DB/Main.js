const Controller = require('../controllers/Controller');
const DataBase = require('./DataBase');
const Shop = require('./Shop');
const Brand = require('./Brand');
const Type = require('./Type');
const Characteristic = require('./Characteristic');
const Product = require('./Product');
const ShopProduct = require('./ShopProduct');
const CharacteristicProduct = require('./CharacteristicProduct');
const View = require('./View');
const FunctionSql = require('./Function');
const Procedure = require('./Procedure');
const Trigger = require('./Trigger');

class Main {
	async main(req, res, next) {
		const transaction = Controller.createTransaction();
		transaction.begin(async (err) => {
			const request = Controller.createRequestInTransaction(transaction);
			await DataBase.main(request);
			await Shop.main(request);
			await Brand.main(request);
			await Type.main(request);
			await Characteristic.main(request);
			await Product.main(request);
			await ShopProduct.main(request);
			await CharacteristicProduct.main(request);

			await View.main(request);
			await FunctionSql.main(request);
			await Procedure.main(request);
			await Trigger.main(request);

			await transaction.commit();
			//return res.json('finish');
			console.log('finish');
		});
	}
}

module.exports = new Main();
