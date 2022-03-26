class View {
	async main(request) {
		await request.query(`
        DROP VIEW IF EXISTS GoodType
        DROP VIEW IF EXISTS GetType
        DROP VIEW IF EXISTS GetBrand
        DROP VIEW IF EXISTS GetProduct
        DROP VIEW IF EXISTS CharacteristicAndDescription
        DROP VIEW IF EXISTS ProductsInShop
        `);
		//GoodType
		await request.query(`
        CREATE VIEW GoodType
        AS
            SELECT DISTINCT TypeProduct.type_name AS name, TypeProduct.type_id AS id
            FROM Product
            JOIN TypeProduct ON Product.type_id = TypeProduct.type_id
        `);
		//GetType
		await request.query(`
        CREATE VIEW GetType
        AS
            SELECT type_id AS id, type_name AS name
            FROM TypeProduct
        `);
		//GetBrand
		await request.query(`
        CREATE VIEW GetBrand
        AS
            SELECT brand_id AS id, brand_name AS name
            FROM Brand
        `);
		//GetProduct
		await request.query(`
        CREATE VIEW GetProduct
        AS
            SELECT Product.product_id, Product.product_name,
            Product.product_price, Product.type_id, Product.brand_id,
            Brand.brand_name, TypeProduct.type_name
            FROM Product
            JOIN Brand ON Product.brand_id = Brand.brand_id
            JOIN TypeProduct ON Product.type_id = TypeProduct.type_id
        `);
		//CharacteristicAndDescription
		await request.query(`
        CREATE VIEW CharacteristicAndDescription
        AS
            SELECT Characteristic.characteristic_name AS title,
            Characteristic_Product.description,
            Characteristic_Product.product_id
            FROM Characteristic_Product
            JOIN Characteristic ON Characteristic_Product.characteristic_id = Characteristic.characteristic_id
        `);
		//ProductsInShop
		await request.query(`
        CREATE VIEW ProductsInShop
        AS
            SELECT shop_address, Product.product_id FROM Product
            JOIN Shop_Product ON Product.product_id = Shop_Product.product_id
            JOIN Shop ON Shop_Product.shop_id = Shop.shop_id
        `);
		console.log(`CreateView finish.`);
	}
}

module.exports = new View();
