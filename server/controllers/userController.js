const ApiError = require('../error/ApiError');
const Controller = require('./Controller');
class UserController {
	async create(req, res, next) {
		let date = Date.now();
		date = date % 10000000;
		const request = Controller.createRequest();
		try {
			await request.query(`
			EXEC addUser ${date}
			`);
			return res.json(date);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}
module.exports = new UserController();
