import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { adminFetchBrands, createBrand } from '../../http/adminApi';

const CreateBrand = ({ show, onHide }) => {
	const [value, setValue] = useState('');
	const { device } = useContext(Context);
	const addBrand = () => {
		createBrand({ name: value })
			.then(async (data) => {
				//testing
				const res = await adminFetchBrands();
				device.setBrands(res);
				setValue('');
				onHide();
				alert(data);
			})
			.catch((error) => alert(error.response.data.message));
	};

	return (
		<Modal centered show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Добавить бренд</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder={'Введите название бренда...'} />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={addBrand}>
					Добавить
				</Button>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateBrand;
