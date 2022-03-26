import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { deleteDevice, getBasket } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/consts';

const Basket = observer(() => {
	let key = 0;
	const navigate = useNavigate();
	const { device } = useContext(Context);
	const [loading, setLoading] = useState(true);
	let sum = device.devices.reduce((sum, cur) => sum + cur.price, 0);
	useEffect(() => {
		let id = localStorage.getItem('id');
		if (id) {
			getBasket(id)
				.then((data) => {
					device.setDevices(data);
				})
				.catch((error) => {
					alert(error.response.data.message);
				})
				.finally(() => setLoading(false));
		} else {
			alert('Добавьте что-нибудь в корзину');
			navigate(HOME_ROUTE);
		}
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <div></div>;
	}

	return (
		<Container className="mt-5">
			{device.devices.map((item) => (
				<div key={key++} className="d-flex justify-content-end align-items-center">
					<Card
						body
						onClick={() => {
							navigate(HOME_ROUTE + '/' + item.typeId + '/' + item.id);
						}}
						style={{ cursor: 'pointer' }}
						className="p-3 flex-grow-1"
					>
						<div className="d-flex justify-content-end align-items-center">
							<div className="flex-grow-1">
								{item.type} {item.brand} {item.name}
							</div>
							<div className="me-3"> {item.price} р.</div>
						</div>
					</Card>
					<Button
						variant="outline-danger"
						className=""
						onClick={async () => {
							for (let i = 0; i < device.devices.length; i++) {
								if (device.devices[i] === item) {
									let id = localStorage.getItem('id');
									try {
										await deleteDevice(id, item.id);
										device.deleteDevice(i);
										break;
									} catch (error) {
										alert(error.response.data.message);
										break;
									}
								}
							}
						}}
					>
						Удалить
					</Button>
				</div>
			))}
			<h2 className="mt-4 me-5 d-flex justify-content-end">
				Сумма: {Math.floor(sum / 1000)} {sum % 1000} р.
			</h2>
		</Container>
	);
});

export default Basket;
