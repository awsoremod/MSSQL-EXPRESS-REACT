import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { ADMIN_ROUTE, BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();
	const logOut = () => {
		user.setIsAdmin(false);
		localStorage.removeItem('token');
	};
	return (
		<Navbar bg="info" variant="dark">
			<Container>
				<Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate(HOME_ROUTE)}>
					Home
				</Navbar.Brand>
				{user.isAdmin ? (
					<Nav className="ml-auto variant">
						<Button
							variant="outline-dark"
							className="me-1"
							onClick={() => {
								navigate(ADMIN_ROUTE);
							}}
						>
							Aдмин панель
						</Button>
						<Button
							variant="outline-dark"
							className="me-4"
							onClick={() => {
								logOut();
								navigate(HOME_ROUTE);
							}}
						>
							Выйти
						</Button>
						<Button
							variant="outline-secondary"
							style={{ color: 'white' }}
							onClick={() => {
								navigate(BASKET_ROUTE);
							}}
						>
							Корзина
						</Button>
					</Nav>
				) : (
					<Nav className="ml-auto">
						<Button
							variant="outline-dark"
							className="me-4"
							onClick={() => {
								navigate(LOGIN_ROUTE);
							}}
						>
							Aдмин панель
						</Button>
						<Button
							variant="outline-secondary"
							style={{ color: 'white' }}
							onClick={() => {
								navigate(BASKET_ROUTE);
							}}
						>
							Корзина
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
});

export default NavBar;
