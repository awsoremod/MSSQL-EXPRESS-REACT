class DataBase {
	async main(request) {
		await this.dropDB(request);
		await this.createDB(request);
		console.log(`Create finish.`);
	}

	async dropDB(request) {
		await request.query(`
			DROP TABLE Shop_Product
			DROP TABLE Characteristic_Product
			DROP TABLE Basket_Product
			DROP TABLE Product
			DROP TABLE Basket
			DROP TABLE Shop
			DROP TABLE Characteristic
			DROP TABLE Brand
			DROP TABLE TypeProduct
			DROP TABLE Unknown_user
			`);
	}

	async createDB(request) {
		// Unknown_user
		await request.query(`
			CREATE TABLE [dbo].[Unknown_user](
				[user_id] [int] NOT NULL,

				CONSTRAINT [PK_Unknown_user_user_id] PRIMARY KEY CLUSTERED
				(
					[user_id] ASC
				)
			)
			`);
		// TypeProduct
		await request.query(`
			CREATE TABLE [dbo].[TypeProduct](
				[type_id] [int] IDENTITY(1,1) NOT NULL,
				[type_name] [nvarchar](30) NOT NULL,

				CONSTRAINT [PK_Type_product] PRIMARY KEY CLUSTERED
				(
					[type_id] ASC
				),
				CONSTRAINT [DF_Type_product_type_name_Unique] UNIQUE NONCLUSTERED
				(
					[type_name] ASC
				)
			)
			`);
		// Brand
		await request.query(`
			CREATE TABLE [dbo].[Brand](
				[brand_id] [int] IDENTITY(1,1) NOT NULL,
				[brand_name] [nvarchar](30) NOT NULL,

				CONSTRAINT [PK_Brand] PRIMARY KEY CLUSTERED
				(
					[brand_id] ASC
				),
				CONSTRAINT [DF_Brand_brand_name_Unique] UNIQUE NONCLUSTERED
				(
					[brand_name] ASC
				)
			)
			`);
		// Characteristic
		await request.query(`
			CREATE TABLE [dbo].[Characteristic](
				[characteristic_id] [int] IDENTITY(1,1) NOT NULL,
				[characteristic_name] [nvarchar](50) NOT NULL,

				CONSTRAINT [PK_Сharacteristic] PRIMARY KEY CLUSTERED
				(
					[characteristic_id] ASC
				),
				CONSTRAINT [DF_Сharacteristic_characteristic_name_Unique] UNIQUE NONCLUSTERED
				(
					[characteristic_name] ASC
				)
			)
			`);
		// Shop
		await request.query(`
			CREATE TABLE [dbo].[Shop](
				[shop_id] [int] IDENTITY(1,1) NOT NULL,
				[shop_address] [nvarchar](50) NOT NULL,

				CONSTRAINT [PK_Shop] PRIMARY KEY CLUSTERED
				(
					[shop_id] ASC
				),
				CONSTRAINT [DF_Shop_shop_address_Unique] UNIQUE NONCLUSTERED
				(
					[shop_address] ASC
				)
			)
			`);
		// Basket
		await request.query(`
			CREATE TABLE [dbo].[Basket](
				[basket_id] [int] IDENTITY(1,1) NOT NULL,
				[user_id] [int] NOT NULL,

				CONSTRAINT [PK_Basket] PRIMARY KEY CLUSTERED
				(
					[basket_id] ASC
				),
				CONSTRAINT [DF_Basket_user_id_Unique] UNIQUE NONCLUSTERED
				(
					[user_id] ASC
				),

				CONSTRAINT [FK_Basket_Unknown_user] FOREIGN KEY([user_id])
				REFERENCES [dbo].[Unknown_user] ([user_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE
			)
			`);
		// Product
		await request.query(`
			CREATE TABLE [dbo].[Product](
				[product_id] [int] IDENTITY(1,1) NOT NULL,
				[product_name] [nvarchar](50) NOT NULL,
				[product_price] [money] NOT NULL,
				[type_id] [int] NOT NULL,
				[brand_id] [int] NOT NULL,

				CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED
				(
					[product_id] ASC
				),
				CONSTRAINT [DF_Product_type_id_brand_id_product_name_Unique] UNIQUE NONCLUSTERED
				(
					[type_id] ASC,
					[brand_id] ASC,
					[product_name] ASC
				),

				CONSTRAINT [FK_Product_Brand] FOREIGN KEY([brand_id])
				REFERENCES [dbo].[Brand] ([brand_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE,

				CONSTRAINT [FK_Product_TypeProduct] FOREIGN KEY([type_id])
				REFERENCES [dbo].[TypeProduct] ([type_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE
			)
			`);
		// Basket_Product
		await request.query(`
			CREATE TABLE [dbo].[Basket_Product](
				[basket_id] [int] NOT NULL,
				[product_id] [int] NOT NULL,

				CONSTRAINT [FK_Basket_Product_Basket] FOREIGN KEY([basket_id])
				REFERENCES [dbo].[Basket] ([basket_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE,

				CONSTRAINT [FK_Basket_Product_Product] FOREIGN KEY([product_id])
				REFERENCES [dbo].[Product] ([product_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE
			)
			`);
		// Characteristic_Product
		await request.query(`
			CREATE TABLE [dbo].[Characteristic_Product](
				[product_id] [int] NOT NULL,
				[characteristic_id] [int] NOT NULL,
				[description] [nvarchar](50) NOT NULL,

				CONSTRAINT [DF_Characteristic_Product _product_id_characteristic_id_Unique] UNIQUE NONCLUSTERED
				(
					[product_id] ASC,
					[characteristic_id] ASC
				),

				CONSTRAINT [FK_Characteristic_Product_Characteristic] FOREIGN KEY([characteristic_id])
				REFERENCES [dbo].[Characteristic] ([characteristic_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE,

				CONSTRAINT [FK_Characteristic_Product_Product] FOREIGN KEY([product_id])
				REFERENCES [dbo].[Product] ([product_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE
			)
			`);
		//Shop_Product
		await request.query(`
			CREATE TABLE [dbo].[Shop_Product](
				[shop_id] [int] NOT NULL,
				[product_id] [int] NOT NULL,
				[amount] [int] NOT NULL,

				CONSTRAINT [FK_Shop_Product_Product] FOREIGN KEY([product_id])
				REFERENCES [dbo].[Product] ([product_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE,

				CONSTRAINT [FK_Shop_Product_Shop] FOREIGN KEY([shop_id])
				REFERENCES [dbo].[Shop] ([shop_id])
				ON UPDATE CASCADE
				ON DELETE CASCADE
			)
			`);
	}
}

module.exports = new DataBase();
