class ControlPool {
	#ConnectionPool;
	#POOLS;
	constructor() {
		const { ConnectionPool } = require('mssql');
		this.#ConnectionPool = ConnectionPool;
		this.#POOLS = {};
	}

	createPool(config, name) {
		if (this.getPool(name)) {
			return Promise.reject(new Error('Pool with this name already exists'));
		}
		return new this.#ConnectionPool(config).connect().then((pool) => {
			return (this.#POOLS[name] = pool);
		});
	}

	closePool(name) {
		const pool = getPool(name);
		if (pool) {
			delete this.#POOLS[name];
			return pool.close();
		}
		return Promise.resolve();
	}

	getPool(name) {
		if (this.#POOLS.hasOwnProperty(name)) {
			return this.#POOLS[name];
		}
	}
}

module.exports = new ControlPool();
