import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const Shops = ({ show, onHide, arrShops }) => {
	return (
		<Modal centered show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Магазины</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					{arrShops.map((shop) => (
						<div>{shop}</div>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Shops;
