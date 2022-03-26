import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Shops from '../components/modals/Shops';
import { fetchOneDevice } from '../http/deviceApi';
import { addBasket, createUser } from '../http/userApi';

const DevicePage = () => {
	let id = localStorage.getItem('id');
	const [shopsVisible, setShopsVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [device, setDevice] = useState({
		info: [],
		type: undefined,
		brand: undefined,
		name: undefined,
		price: undefined,
		id: undefined,
		shops: [],
	});
	const { idDevice } = useParams();
	useEffect(() => {
		fetchOneDevice(idDevice)
			.then((data) => {
				setDevice(data);
			})
			.catch((error) => {
				alert(error.response.data.message);
			})
			.finally(() => setLoading(false));
		//eslint-disable-next-line
	}, []);

	async function addInBasket() {
		try {
			if (!id) {
				id = await createUser();
				id = localStorage.getItem('id');
			}
			await addBasket(id, device.id);
			alert('Добавлен в корзину');
		} catch (err) {
			alert(err);
		}
	}

	if (loading) {
		return <div></div>;
	}

	return (
		<Container className="mt-4">
			<Row>
				<Col md={6}>
					<Row>
						<h2>
							{device.type} {device.brand} {device.name}
						</h2>
					</Row>
				</Col>
				<Col md={6} className="d-flex flex-column align-items-end">
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{ width: 300, height: 170, border: '5px solid lightblue' }}
					>
						<h3>Oт: {device.price} р.</h3>
						{device.shops[0] ? (
							<div className="mb-2">
								<div>В наличии: </div>
								{device.shops.length === 1 ? (
									<Button className="p-0" variant="link" onClick={() => setShopsVisible(true)}>
										в 1 магазине
									</Button>
								) : (
									<Button className="p-0" variant="link" onClick={() => setShopsVisible(true)}>
										в {device.shops.length} магазинах
									</Button>
								)}
							</div>
						) : (
							<div>Нет в наличии</div>
						)}
						<Button onClick={addInBasket} className="mb-2" variant={'outline-dark'}>
							Добавить в корзину
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className="d-flex flex-column m-3">
				<h1>Характеристики</h1>
				<hr />
				{device.info.map((info, index) => (
					<Row key={index} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
			<Shops
				show={shopsVisible}
				onHide={() => {
					setShopsVisible(false);
				}}
				arrShops={device.shops}
			/>
		</Container>
	);
};

export default DevicePage;
