class Type {
	async main(request) {
		let types = ['Смартфон', 'Процессор', 'Телевизорр', 'Холодильник', 'Мышь', 'Монитор', 'Стиральная машина'];

		for (let type of types) {
			await request.query(`
            INSERT INTO TypeProduct (type_name)
            VALUES ('${type}')
        `);
			console.log(`type. add (${type})`);
		}
	}
}

module.exports = new Type();
