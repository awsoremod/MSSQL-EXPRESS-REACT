class ShopProduct {
	async main(request) {
		let numberShop;
		let inShop;
		for (let i = 0; i < 98; i++) {
			if (i % 4 === 0) {
				continue;
			}
			numberShop = Math.floor(Math.random() * 3) + 1;
			switch (numberShop) {
				case 1: {
					inShop = Math.floor(Math.random() * 3) + 1;
					await request.query(`
					INSERT INTO Shop_Product (shop_id, product_id, amount)
                    VALUES (${inShop}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})
					`);
					console.log(`shop_product. add (${i + 1})`);
					break;
				}
				case 2: {
					inShop = Math.floor(Math.random() * 3) + 1;
					switch (inShop) {
						case 1: {
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${2}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${3}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							console.log(`shop_product. add (${i + 1})`);
							break;
						}
						case 2: {
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${1}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${3}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							console.log(`shop_product. add (${i + 1})`);
							break;
						}
						case 3: {
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${1}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							await request.query(`
					        INSERT INTO Shop_Product (shop_id, product_id, amount)
                            VALUES (${2}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
							console.log(`shop_product. add (${i + 1})`);
							break;
						}
					}
					break;
				}
				case 3: {
					await request.query(`
					INSERT INTO Shop_Product (shop_id, product_id, amount)
					VALUES (${1}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
					await request.query(`
					INSERT INTO Shop_Product (shop_id, product_id, amount)
					VALUES (${2}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
					await request.query(`
					INSERT INTO Shop_Product (shop_id, product_id, amount)
					VALUES (${3}, ${i + 1}, ${Math.floor(Math.random() * 20) + 2})`);
					console.log(`shop_product. add (${i + 1})`);
					break;
				}
			}
		}
	}
}

module.exports = new ShopProduct();
