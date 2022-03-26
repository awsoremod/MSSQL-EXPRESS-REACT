const ApiError = require('../error/ApiError');
const Controller = require('./Controller');
class TypeController {
	async create(req, res, next) {
		const request = Controller.createRequest();
		const { name } = req.body;
		try {
			await request.query(`
			EXEC addType ${name}
			`);
			return res.json(`В таблицу TypeProduct, в столбец type_name, добавлено '${name}'`);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getAll(req, res, next) {
		const request = Controller.createRequest();
		try {
			const types = await request.query(`
			SELECT *
			FROM GoodType
			`);
			return res.json(types.recordset);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}
module.exports = new TypeController();
