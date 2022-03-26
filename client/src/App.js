import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/adminApi';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
	const [loading, setLoading] = useState(true);
	const { user } = useContext(Context);

	useEffect(() => {
		check()
			.then((data) => {
				user.setIsAdmin(true);
			})
			.catch((err) => {})
			.finally(() => setLoading(false));
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner animation="border" variant="info" />;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
