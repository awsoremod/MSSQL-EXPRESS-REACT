class Controller {
	sql = require('mssql');
	pool = require('../controlPool').getPool('global');

	createRequest() {
		return new this.sql.Request(this.pool);
	}

	createTransaction() {
		return new this.sql.Transaction(this.pool);
	}

	createRequestInTransaction(transaction) {
		return new this.sql.Request(transaction);
	}
}
module.exports = new Controller();
