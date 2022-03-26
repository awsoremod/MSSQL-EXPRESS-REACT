import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../../index';
import { adminFetchBrands, adminFetchTypes, createDevice } from '../../http/adminApi';

const CreateDevice = ({ show, onHide }) => {
	const { device } = useContext(Context);
	const [info, setInfo] = useState([]);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [brand, setBrand] = useState({ id: undefined, name: undefined });
	const [type, setType] = useState({ id: undefined, name: undefined });

	useEffect(() => {
		adminFetchTypes().then((data) => device.setTypes(data));
		adminFetchBrands().then((data) => device.setBrands(data));
		//eslint-disable-next-line
	}, []);

	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
	};

	const addDevice = () => {
		let obj = {
			name: name,
			price: price,
			brandId: brand.id,
			typeId: type.id,
			info: info,
		};
		createDevice(obj)
			.then((data) => {
				onHide();
				alert(data);
			})
			.catch((error) => alert(error.response.data.message));
	};

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	};

	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number));
	};

	return (
		<Modal centered show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Добавить устройство...</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{type.name || 'Выберите тип'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.types.map((type) => (
								<Dropdown.Item onClick={() => setType(type)} key={type.id}>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{brand.name || 'Выберите бренд'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.brands.map((brand) => (
								<Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-3"
						placeholder={'Введите название устройства...'}
					/>
					<Form.Control
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className="mt-3"
						placeholder={'Введите стоимость устройства...'}
						type="number"
					/>
					<hr />
					<Button variant="outline-dark" onClick={addInfo}>
						Добавить новое свойство
					</Button>
					{info.map((i) => (
						<Row className="mt-3" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) => changeInfo('title', e.target.value, i.number)}
									placeholder="Введите название свойства"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									onChange={(e) => changeInfo('description', e.target.value, i.number)}
									value={i.description}
									placeholder="Введите описание свойства"
								/>
							</Col>
							<Col md={4}>
								<Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={addDevice}>
					Добавить
				</Button>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateDevice;
