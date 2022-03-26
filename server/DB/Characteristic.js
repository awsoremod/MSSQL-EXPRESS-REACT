class Characteristic {
	async main(request) {
		let characteristics = [
			'Гарантия',
			'Страна-производитель',
			'Год релиза',
			'Диагональ экрана (дюйм)',
			'Плотность пикселей',
			'Количество основных (тыловых) камер',
			'Емкость аккумулятора',
			'Вес',
			'Модель процессора',
			'Базовая частота процессора',
			'Общий полезный объем',
		];
		for (let characteristic of characteristics) {
			await request.query(`
            INSERT INTO Characteristic (characteristic_name)
            VALUES ('${characteristic}')
        `);
			console.log(`characteristic. add (${characteristic})`);
		}
	}
}

module.exports = new Characteristic();
