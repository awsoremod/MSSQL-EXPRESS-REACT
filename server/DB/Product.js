class Product {
	async main(request) {
		let products = [
			{ name: 'iPhone 13', price: 79499, type: 1, brand: 1 }, //Смартфон
			{ name: 'iPhone 12', price: 68799, type: 1, brand: 1 }, //Apple
			{ name: 'iPhone 13 mini', price: 69599, type: 1, brand: 1 },
			{ name: 'iPhone 11 Pro', price: 72999, type: 1, brand: 1 },
			{ name: 'Galaxy A52', price: 31999, type: 1, brand: 7 }, //Samsung
			{ name: 'Galaxy S21', price: 59999, type: 1, brand: 7 },
			{ name: 'Galaxy M12', price: 14999, type: 1, brand: 7 },
			{ name: 'Galaxy A12', price: 12999, type: 1, brand: 7 },
			{ name: 'Galaxy M32', price: 22999, type: 1, brand: 7 },
			{ name: 'ROG Phone 5', price: 79999, type: 1, brand: 3 }, //Asus
			{ name: 'Zenfone 8', price: 54999, type: 1, brand: 3 },
			{ name: 'Y5p', price: 7999, type: 1, brand: 11 }, //HUAWEI
			{ name: 'Y6p', price: 10999, type: 1, brand: 11 },
			{ name: 'nova 8', price: 29999, type: 1, brand: 11 },
			{ name: 'P40 Lite', price: 17099, type: 1, brand: 11 },
			{ name: 'nova 9', price: 34999, type: 1, brand: 11 },
			{ name: 'P40 Pro', price: 59599, type: 1, brand: 11 },
			{ name: 'Mate40 Pro', price: 89999, type: 1, brand: 11 },

			{ name: 'Core i5-10400F', price: 11899, type: 2, brand: 5 }, //Процессор
			{ name: 'Core i5-11400', price: 15899, type: 2, brand: 5 }, //Intel
			{ name: 'Core i3-10100F', price: 6499, type: 2, brand: 5 },
			{ name: 'Core i7-11700K', price: 30899, type: 2, brand: 5 },
			{ name: 'Core i9-12900K', price: 54599, type: 2, brand: 5 },
			{ name: 'Core i5-11600KF', price: 19499, type: 2, brand: 5 },
			{ name: 'Core i7-12700K', price: 37999, type: 2, brand: 5 },
			{ name: 'Core i5-9400F', price: 13199, type: 2, brand: 5 },
			{ name: 'Core i9-11900K', price: 44999, type: 2, brand: 5 },
			{ name: 'Core i9-10900KF', price: 35999, type: 2, brand: 5 },
			{ name: 'Ryzen 5 3600', price: 19999, type: 2, brand: 6 }, //AMD
			{ name: 'Ryzen 5 5600X', price: 24999, type: 2, brand: 6 },
			{ name: 'Ryzen 7 5800X', price: 31999, type: 2, brand: 6 },
			{ name: 'Ryzen 9 5900X', price: 46499, type: 2, brand: 6 },
			{ name: 'Ryzen 5 1600', price: 14999, type: 2, brand: 6 },
			{ name: 'Ryzen 9 5950X', price: 69499, type: 2, brand: 6 },
			{ name: 'Ryzen 5 5600G', price: 23999, type: 2, brand: 6 },
			{ name: 'Ryzen 7 3700X', price: 26999, type: 2, brand: 6 },
			{ name: 'Ryzen 9 3900X', price: 42699, type: 2, brand: 6 },
			{ name: 'Ryzen 3 4300GE', price: 17999, type: 2, brand: 6 },
			{ name: 'Ryzen 7 5700G', price: 29999, type: 2, brand: 6 },

			{ name: '65UP75006LF', price: 56999, type: 3, brand: 2 }, //Телевизор
			{ name: '43UP75006LF', price: 37999, type: 3, brand: 2 }, //LG
			{ name: 'OLED55C1RLA', price: 119999, type: 3, brand: 2 },
			{ name: '43UN68006LA', price: 36999, type: 3, brand: 2 },
			{ name: '55NANO866PA', price: 56999, type: 3, brand: 2 },
			{ name: 'UE50TU7002UXRU', price: 44999, type: 3, brand: 7 }, //Samsung
			{ name: 'UE43TU7002UXRU', price: 36899, type: 3, brand: 7 },
			{ name: 'UE50AU7560UXRU', price: 59999, type: 3, brand: 7 },
			{ name: 'UE65TU7090UXRU', price: 76999, type: 3, brand: 7 },
			{ name: 'QE55Q70AAUXRU', price: 104999, type: 3, brand: 7 },
			{ name: 'HD55KAN9A', price: 59999, type: 3, brand: 11 }, //HUAWEI
			{ name: 'HD65KAN9A', price: 89999, type: 3, brand: 11 },

			{ name: 'GA-B459CLWL', price: 37999, type: 4, brand: 2 }, //Холодильник
			{ name: 'GA-B509CEWL', price: 45999, type: 4, brand: 2 }, //LG
			{ name: 'GC-B569PMCZ', price: 59999, type: 4, brand: 2 },
			{ name: 'ITD 4180 W', price: 27999, type: 4, brand: 4 }, //Indesit
			{ name: 'ITD 5200 W', price: 30999, type: 4, brand: 4 },
			{ name: 'ITR 4200 S', price: 29999, type: 4, brand: 4 },
			{ name: 'ITR 5200 X', price: 32999, type: 4, brand: 4 },
			{ name: 'RB37A5470SA/WT', price: 42999, type: 4, brand: 7 }, //Samsung
			{ name: 'RB30A32NOWW/WT', price: 44999, type: 4, brand: 7 },

			{ name: 'G102 LightSync', price: 2050, type: 5, brand: 8 }, //Мышь
			{ name: 'PRO X SUPERLIGHT', price: 12999, type: 5, brand: 8 }, //Logitech
			{ name: 'G502 HERO', price: 4599, type: 5, brand: 8 },
			{ name: 'Magic Mouse', price: 7499, type: 5, brand: 8 },
			{ name: 'M170', price: 850, type: 5, brand: 1 }, // Apple
			{ name: 'DeathAdder V2', price: 5299, type: 5, brand: 9 }, // Razer
			{ name: 'Omen Vector', price: 5750, type: 5, brand: 10 }, // HP
			{ name: 'X500', price: 699, type: 5, brand: 10 },
			{ name: 'Pavilion 200', price: 1250, type: 5, brand: 10 },
			{ name: 'ROG Keris Wireless', price: 6999, type: 5, brand: 3 }, // Asus
			{ name: 'TUF Gaming M3', price: 1999, type: 5, brand: 3 },
			{ name: 'ROG Chakram Core', price: 7799, type: 5, brand: 3 },
			{ name: 'CD20 Swift', price: 2499, type: 5, brand: 11 }, // HUAWEI

			{ name: 'UltraGear 27GL83A-B', price: 27899, type: 6, brand: 2 }, //  Монитор
			{ name: '24MK430H', price: 10999, type: 6, brand: 2 }, // LG
			{ name: '27MP400-B', price: 13899, type: 6, brand: 2 },
			{ name: 'X27q', price: 24999, type: 6, brand: 10 }, // HP
			{ name: 'M24f', price: 13999, type: 6, brand: 10 },
			{ name: 'V22', price: 10299, type: 6, brand: 10 },
			{ name: 'VG2480G', price: 16499, type: 6, brand: 3 }, // Asus
			{ name: 'TUF Gaming VG259QR', price: 20399, type: 6, brand: 3 },
			{ name: 'VZ249HEG1R', price: 12999, type: 6, brand: 3 },
			{ name: 'Odyssey G5 C27G55TQWI', price: 23999, type: 6, brand: 7 }, // Samsung
			{ name: 'S32AM700UI', price: 26500, type: 6, brand: 7 },
			{ name: 'U28R550UQI', price: 24599, type: 6, brand: 7 },
			{ name: 'Odyssey G7 C27G75TQSI', price: 49899, type: 6, brand: 7 },
			{ name: 'MateView GT ZQE-CBA', price: 39499, type: 6, brand: 11 }, // HUAWEI
			{ name: 'AD80HW', price: 11999, type: 6, brand: 11 },
			{ name: 'Pro Display XDR', price: 323299, type: 6, brand: 1 }, // Apple

			{ name: 'F1296NDS1', price: 26999, type: 7, brand: 2 }, // Стиральная машина
			{ name: 'FH0B8LD6', price: 25099, type: 7, brand: 2 }, // LG
			{ name: 'F2V5NG0W', price: 36449, type: 7, brand: 2 },
			{ name: 'WW60K40G00WDLP', price: 28899, type: 7, brand: 7 }, // Samsung
			{ name: 'WD80K52E0AX/LP', price: 50999, type: 7, brand: 7 },
			{ name: 'WW10T634CLH/LP', price: 43199, type: 7, brand: 7 },
			{ name: 'WW90T554CAW/LP', price: 42999, type: 7, brand: 7 },
			{ name: 'IWSD 51051 CIS', price: 14999, type: 7, brand: 4 }, // Indesit
			{ name: 'BWSB 50851', price: 16249, type: 7, brand: 4 },
		];

		for (let product of products) {
			await request.query(`
            INSERT INTO Product (product_name, product_price, type_id, brand_id)
            VALUES ('${product.name}', ${product.price}, ${product.type}, ${product.brand})
        `);
			console.log(`product. add (${product.name})`);
		}
	}
}

module.exports = new Product();
