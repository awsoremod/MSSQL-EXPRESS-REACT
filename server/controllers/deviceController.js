const ApiError = require('../error/ApiError');
const Controller = require('./Controller');
class DeviceController {
	async getAll(req, res, next) {
		let { limit, page, sort, brands, stock, id } = req.query;
		page = page || 1;
		limit = limit || 5;

		let isWhere = false;
		let addSqlOrder = 'DESC';
		let addSqlShops = '';
		let addSqlWhere = '';
		let addSqlType = '';

		if (sort === '2') {
			addSqlOrder = 'ASC';
		}
		if (stock === '1') {
			addSqlShops = `
			JOIN Shop_Product ON Product.product_id = Shop_Product.product_id
			`;
		}

		if (brands) {
			for (let i of brands) {
				let obj = JSON.parse(i);
				if (isWhere) {
					addSqlWhere += `Product.brand_id = ${obj.id} OR `;
				} else {
					addSqlWhere += `WHERE (Product.brand_id = ${obj.id} OR `;
					isWhere = true;
				}
			}
			addSqlWhere = addSqlWhere.slice(0, addSqlWhere.length - 3);
			addSqlWhere += ')';
		}

		if (id) {
			if (isWhere) {
				addSqlType = `AND Product.type_id = ${id}`;
			} else {
				addSqlType = `WHERE Product.type_id = ${id}`;
			}
		}

		const request = Controller.createRequest();
		try {
			const result = await request.query(`
		WITH SOURCE AS (
			SELECT ROW_NUMBER() OVER (ORDER BY product_price ${addSqlOrder}) AS RowNumber,
			product_id AS id, type_name AS type, brand_name AS brand,
			product_name AS name, product_price AS price
			FROM (
				SELECT DISTINCT Product.product_id, TypeProduct.type_name, Brand.brand_name,
				Product.product_name, Product.product_price
				FROM Product
				JOIN Brand ON Product.brand_id = Brand.brand_id
				JOIN TypeProduct ON Product.type_id = TypeProduct.type_id
				${addSqlShops}
				${addSqlWhere}
				${addSqlType}
			) AS X
		)

		SELECT id, type, brand, name, price
		FROM SOURCE
		WHERE RowNumber > (${limit} * ${page}) - ${limit}
		AND RowNumber <= ${limit} * ${page}

		SELECT count(*) AS [valueCount]
		FROM (
			SELECT DISTINCT Product.product_id FROM Product
			${addSqlShops}
			${addSqlWhere}
			${addSqlType}
		) AS G
		        `);
			let response = {};
			response['count'] = result.recordsets[1][0].valueCount;
			response['rows'] = result.recordset;
			return res.json(response);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getOne(req, res, next) {
		const { id } = req.params;
		const request = Controller.createRequest();
		try {
			const result = await request.query(`
			SELECT *
			FROM getOneProduct(${id})

			SELECT *
			FROM getCharacteristicsProduct(${id})

			SELECT *
			FROM getShopsProduct(${id})
			`);

			if (result.recordset[0] === undefined) {
				throw { message: 'Нет девайса' };
			}

			let response = {};
			response = result.recordset[0];
			response['info'] = result.recordsets[1];
			response['shops'] = [];
			for (let i of result.recordsets[2]) {
				response['shops'].push(i.shop_address);
			}
			return res.json(response);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async create(req, res, next) {
		const { name, price, brandId, typeId, info } = req.body;
		const transaction = Controller.createTransaction();
		transaction.begin(async (err) => {
			const request = Controller.createRequestInTransaction(transaction);
			try {
				let deviceIdSql;
				let response;
				const isDevice = await request.query(`
				SELECT * FROM Product
				WHERE type_id = ${typeId}
				AND brand_id = ${brandId}
				AND product_name = '${name}'
				`);
				if (isDevice.recordset[0] === undefined) {
					await request.query(`
					INSERT INTO Product (type_id, brand_id, product_name, product_price)
					VALUES (${typeId}, ${brandId}, '${name}', ${price})
					`);
					response = 'В БД создан новый девайс. ';
					deviceIdSql = `
					SET @lastProductId = IDENT_CURRENT('Product')
					`;
				} else {
					response = 'В БД был этот девайс. ';
					deviceIdSql = `
					SET @lastProductId = ${isDevice.recordset[0].product_id}`;
				}
				if (!info) {
					await transaction.commit();
					return res.json(response);
				}

				for (let i of info) {
					let requestSql = `
					DECLARE @newcharacterId INT
					DECLARE @lastProductId INT
					${deviceIdSql}
					`;
					let isCharacteristic = await request.query(`
					SELECT * FROM Characteristic
					WHERE characteristic_name = '${i.title}'
					`);
					if (isCharacteristic.recordset[0] === undefined) {
						await request.query(`
						INSERT INTO Characteristic (characteristic_name)
						VALUES ('${i.title}')
						`);
						requestSql += `
						SET @newCharacterId = IDENT_CURRENT('Characteristic')
						`;
						response += `В БД создана новая характеристика (${i.title}). `;
					} else {
						requestSql += `
						SET @newCharacterId = ${isCharacteristic.recordset[0].characteristic_id}
						`;
						response += `В БД была эта характеристика (${i.title}). `;
					}
					let isDescription = await request.query(
						requestSql +
							`
						SELECT * FROM Characteristic_Product
						WHERE product_id = @lastProductId
						AND characteristic_id = @newCharacterId
						`
					);
					if (isDescription.recordset[0] === undefined) {
						await request.query(
							requestSql +
								`
							INSERT INTO Characteristic_Product (product_id, characteristic_id, description)
							VALUES (@lastProductId, @newCharacterId, '${i.description}');
							`
						);
						response += `В БД создано новое описание (${i.description}). `;
					} else {
						response += 'В БД есть связь между этим девайсом и характеристикой. ';
					}
				}
				await transaction.commit();
				return res.json(response);
			} catch (error) {
				await transaction.rollback();
				next(ApiError.badRequest(error.message));
			}
		});
	}
}
module.exports = new DeviceController();
