import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { enter } from '../http/adminApi'; // login in back-end
import { Context } from '../index';
import { ADMIN_ROUTE } from '../utils/consts';

const Auth = () => {
	const { user } = useContext(Context);
	const navigate = useNavigate();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const click = () => {
		enter(login, password)
			.then(() => {
				user.setIsAdmin(true);
				navigate(ADMIN_ROUTE);
			})
			.catch((error) => {
				alert(error.response.data.message);
			});
	};

	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 60 }}>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">Авторизация</h2>
				<Form className="d-flex flex-column mt-4">
					<Form.Control className="mt-3" placeholder="Введите логин..." value={login} onChange={(e) => setLogin(e.target.value)} />
					<Form.Control
						className="mt-3"
						placeholder="Введите пароль..."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
				</Form>
				<Button onClick={click} className="mt-4 align-self-end" variant="outline-info">
					Войти
				</Button>
			</Card>
		</Container>
	);
};

export default Auth;
