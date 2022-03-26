class Procedure {
	async main(request) {
		await request.query(`
        DROP PROCEDURE IF EXISTS addBrand
        DROP PROCEDURE IF EXISTS addType
        DROP PROCEDURE IF EXISTS addUser
        DROP PROCEDURE IF EXISTS createBasket
        DROP PROCEDURE IF EXISTS addInBasket
        DROP PROCEDURE IF EXISTS deleteProductInBasket
        `);
		//addBrand
		await request.query(`
        CREATE PROCEDURE addBrand
            @brandName NVARCHAR(30)
        AS
        BEGIN
            INSERT INTO Brand (brand_name)
            VALUES (@brandName)
        END
        `);
		//addType
		await request.query(`
        CREATE PROCEDURE addType
            @typeName NVARCHAR(30)
        AS
        BEGIN
            INSERT INTO TypeProduct (type_name)
            VALUES (@typeName)
        END
        `);
		//addUser
		await request.query(`
        CREATE PROCEDURE addUser
            @userId INT
        AS
        BEGIN
            INSERT INTO Unknown_user (user_id)
              VALUES (@userId)
        END
        `);
		//createBasket
		await request.query(`
        CREATE PROCEDURE createBasket
            @userId INT
        AS
        BEGIN
            INSERT INTO Basket (user_id)
             VALUES (@userId)

            SELECT SCOPE_IDENTITY() AS id;
        END
        `);
		//addInBasket
		await request.query(`
        CREATE PROCEDURE addInBasket
            @productId INT,
            @basketId INT
        AS
        BEGIN
            INSERT INTO Basket_Product (product_id, basket_id)
            VALUES (@productId, @basketId)
        END
        `);
		//deleteProductInBasket
		await request.query(`
        CREATE PROCEDURE deleteProductInBasket
            @productId INT,
            @basketId INT
        AS
        BEGIN
            DELETE TOP (1)
            FROM Basket_Product
            WHERE product_id = @productId
            AND basket_id = @basketId
        END
        `);
		console.log(`CreateProcedure finish.`);
	}
}

module.exports = new Procedure();
