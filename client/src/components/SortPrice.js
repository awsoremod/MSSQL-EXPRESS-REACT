import React, { useContext, useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { Context } from '../index';

const SortPrice = () => {
	const [value, setValue] = useState('сначала дорогие');
	const { device } = useContext(Context);
	return (
		<Container className="d-flex align-items-center">
			<div>{`Сортировка:`}</div>
			<Dropdown>
				<Dropdown.Toggle className="p-1" variant="link">
					{value}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item
						onClick={() => {
							device.setSortPrice(1);
							device.setPage(1);
							setValue('сначала дорогие');
						}}
					>
						Сначала дорогие
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							device.setSortPrice(2);
							device.setPage(1);
							setValue('сначала недорогие');
						}}
					>
						Сначала недорогие
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Container>
	);
};

export default SortPrice;
