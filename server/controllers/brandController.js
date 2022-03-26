const Controller = require('./Controller');
const ApiError = require('../error/ApiError');
class BrandController {
	async create(req, res, next) {
		const request = Controller.createRequest();
		const { name } = req.body;
		try {
			await request.query(`
			EXEC addBrand ${name}
			`);
			return res.json(`В таблицу Brand, в столбец brand_name, добавлено '${name}'`);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getAll(req, res, next) {
		const { id, stock } = req.query;
		let addSqlStock = '';
		let addSqlWhere = '';
		if (stock === '1') {
			addSqlStock = `JOIN Shop_Product ON Product.product_id = Shop_Product.product_id`;
		}
		if (id) {
			addSqlWhere = 'WHERE Product.type_id =' + id;
		}
		const request = Controller.createRequest();
		try {
			const brands = await request.query(`
			SELECT DISTINCT Brand.brand_id AS id, Brand.brand_name AS name
			FROM Product
			JOIN Brand ON Product.brand_id = Brand.brand_id
			${addSqlStock}
			${addSqlWhere}
			`);
			return res.json(brands.recordset);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}
module.exports = new BrandController();
