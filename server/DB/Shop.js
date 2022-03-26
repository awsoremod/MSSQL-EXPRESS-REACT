class Shop {
	async main(request) {
		let shops = ['Успенский Проспект, 127', 'ул.Мира, 111', 'ул.Блюхера, 27'];

		for (let shop of shops) {
			await request.query(`
            INSERT INTO Shop (shop_address)
            VALUES ('${shop}')
        `);
			console.log(`shop. add (${shop})`);
		}
	}
}

module.exports = new Shop();
