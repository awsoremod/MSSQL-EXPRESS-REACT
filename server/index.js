require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const { DbConfig } = require('./dbConfig');
const controlPool = require('./controlPool');

const PORT = process.env.PORT || 7000;

controlPool
	.createPool(DbConfig, 'global')
	.then(() => {
		console.log('Connected to MSSQL');
		const app = express();
		app.use(cors());
		app.use(express.json());

		const routerTest = new express();
		const createDB = require('./DB/Main');
		routerTest.put('/', createDB.main);
		app.use('/test', routerTest);

		const router = require('./routes/index');
		app.use('/api', router);
		app.use(errorHandler);

		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	})
	.catch((error) => {
		console.log(error);
	});
