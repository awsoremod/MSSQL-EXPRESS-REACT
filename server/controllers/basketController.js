const ApiError = require('../error/ApiError');
const Controller = require('./Controller');
class BasketController {
	async add(req, res, next) {
		const { idUser, idProduct } = req.body;
		const request = Controller.createRequest();
		try {
			await request.query(`
			DECLARE @basketId INT
			SET @basketId = (SELECT dbo.getBasketId(${idUser}))
			IF @basketId IS NULL
				BEGIN
					EXEC addUser ${idUser}
					SET @basketId = (SELECT dbo.getBasketId(${idUser}))
				END
			EXEC addInBasket ${idProduct}, @basketId
			`);
			return res.json(`В корзину пользователя (${idUser}) добавлен девайс (${idProduct})`);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getAll(req, res, next) {
		const { idUser } = req.query;
		const request = Controller.createRequest();
		try {
			const result = await request.query(`
			DECLARE @basketId INT
			SET @basketId = (SELECT dbo.getBasketId(${idUser}))

			SELECT *
			FROM dbo.getProductsInBasket(@basketId)
		`);
			return res.json(result.recordset);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async deleteDevice(req, res, next) {
		const { idUser, idDevice } = req.query;
		const request = Controller.createRequest();
		try {
			await request.query(`
			DECLARE @basketId INT
			SET @basketId = (SELECT dbo.getBasketId(${idUser}))

			EXEC deleteProductInBasket ${idDevice}, @basketId
		`);
			return res.json(`У пользователя (${idUser}), удален девайс (${idDevice})`);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}
module.exports = new BasketController();
