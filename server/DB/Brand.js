class Brand {
	async main(request) {
		let brands = ['Apple', 'LG', 'Asus', 'Indesit', 'Intel', 'AMD', 'Samsung', 'Logitech', 'Razer', 'HP', 'HUAWEI'];

		for (let brand of brands) {
			await request.query(`
			INSERT INTO Brand (brand_name)
			VALUES ('${brand}')
			`);
			console.log(`brand. add (${brand})`);
		}
	}
}

module.exports = new Brand();
