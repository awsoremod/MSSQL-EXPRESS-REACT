class ClearDB {
	async main(request) {
		await request.query(`
		DELETE Unknown_user
		DELETE Brand
		DELETE Characteristic
		DELETE Shop
		DELETE TypeProduct

		DBCC CHECKIDENT (Basket, RESEED, 0)
		DBCC CHECKIDENT (Brand, RESEED, 0)
		DBCC CHECKIDENT (Characteristic, RESEED, 0)
		DBCC CHECKIDENT (Product, RESEED, 0)
		DBCC CHECKIDENT (Shop, RESEED, 0)
		DBCC CHECKIDENT (TypeProduct, RESEED, 0)
		`);
		console.log(`Clear finish.`);
	}
}

module.exports = new ClearDB();
