class FunctionSql {
	async main(request) {
		await request.query(`
			DROP FUNCTION IF EXISTS getBasketId
			DROP FUNCTION IF EXISTS getProductsInBasket
			DROP FUNCTION IF EXISTS getOneProduct
			DROP FUNCTION IF EXISTS getCharacteristicsProduct
			DROP FUNCTION IF EXISTS getShopsProduct
			`);
		//getBasketId
		await request.query(`
			CREATE FUNCTION getBasketId (@userId int)
			RETURNS INT
			AS
			BEGIN
				DECLARE @result int
				SET @result = (
								SELECT basket_id
								FROM Basket
								WHERE user_id = @userId
							)
				RETURN @result
			END
			`);
		//getProductsInBasket
		await request.query(`
			CREATE FUNCTION getProductsInBasket (@basketId int)
			RETURNS TABLE
			AS RETURN
			(
				SELECT GetProduct.product_id AS id, type_id AS typeId,
				type_name AS type, brand_name AS brand,
				product_name AS name, product_price AS price
				FROM GetProduct
				JOIN Basket_Product ON GetProduct.product_id = Basket_Product.product_id
				WHERE basket_id = @basketId
			)
			`);
		//getOneProduct
		await request.query(`
			CREATE FUNCTION getOneProduct (@productId int)
			RETURNS TABLE
			AS RETURN
			(
				SELECT product_id AS id, type_name AS type,brand_name AS brand,
				product_name AS name, product_price AS price
				FROM GetProduct
				WHERE product_id = @productId
			)
			`);
		//getCharacteristicsProduct
		await request.query(`
			CREATE FUNCTION getCharacteristicsProduct (@productId int)
			RETURNS TABLE
			AS RETURN
			(
				SELECT title, description
				FROM CharacteristicAndDescription
				WHERE product_id = @productId
			)
			`);
		//getShopsProduct
		await request.query(`
			CREATE FUNCTION getShopsProduct (@productId int)
			RETURNS TABLE
			AS RETURN
			(
				SELECT shop_address
				FROM ProductsInShop
				WHERE product_id = @productId
			)
			`);
		console.log(`CreateFunction finish.`);
	}
}

module.exports = new FunctionSql();
