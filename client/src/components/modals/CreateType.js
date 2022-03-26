import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { adminFetchTypes, createType } from '../../http/adminApi';
import { Context } from '../..';

const CreateType = ({ show, onHide }) => {
	const { device } = useContext(Context);
	const [value, setValue] = useState('');
	const addType = () => {
		createType({ name: value })
			.then(async (data) => {
				//testing
				const res = await adminFetchTypes();
				device.setTypes(res);
				setValue('');
				onHide();
				alert(data);
			})
			.catch((error) => alert(error.response.data.message));
	};

	return (
		<Modal centered show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Добавить тип</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder={'Введите название типа...'} />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={addType}>
					Добавить
				</Button>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateType;
