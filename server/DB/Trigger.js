class Trigger {
	async main(request) {
		await request.query(`
		DROP TRIGGER IF EXISTS autoCreateBasket
		`);
		//CreateBasket
		await request.query(`
		CREATE TRIGGER autoCreateBasket
        ON dbo.Unknown_user
        AFTER INSERT
        AS
        BEGIN
        DECLARE @insert int
        SET @insert = (SELECT * FROM Inserted)
        EXEC createBasket @insert
        END
		`);
	}
}

module.exports = new Trigger();
