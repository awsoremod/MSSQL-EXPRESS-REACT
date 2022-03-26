const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const Controller = require('./Controller');

const generateJwt = (login) => {
	return jwt.sign({ login }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class AdminController {
	async login(req, res, next) {
		let { login, password } = req.body;
		if (login !== 'user') {
			return next(ApiError.internal('Указан неверный логин'));
		}
		if (password !== '222') {
			return next(ApiError.internal('Указан неверный пароль'));
		}
		const token = generateJwt(login);
		return res.json({ token });
	}

	async check(req, res, next) {
		const token = generateJwt(req.login);
		return res.json({ token });
	}

	async getTypes(req, res, next) {
		const request = Controller.createRequest();
		try {
			const types = await request.query(`
			SELECT *
			FROM GetType
			ORDER BY id
			`);
			return res.json(types.recordset);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getBrands(req, res, next) {
		const request = Controller.createRequest();
		try {
			const types = await request.query(`
			SELECT *
			FROM GetBrand
			ORDER BY id
			`);
			return res.json(types.recordset);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}
module.exports = new AdminController();
