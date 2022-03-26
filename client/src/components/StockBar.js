import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const StockBar = observer(() => {
	const { device } = useContext(Context);
	return (
		<Form>
			<div key={`default-radio`} className="mb-3">
				<Form.Check
					className="mb-1"
					name="group1"
					type={'radio'}
					id={`1`}
					onChange={() => {
						//device.setSelectedBrands([]);
						device.setStock(1);
					}}
					label={`В наличии`}
				/>
				<Form.Check
					name="group1"
					type={'radio'}
					id={`2`}
					onChange={() => {
						//device.setSelectedBrands([]);
						device.setStock(2);
					}}
					label={`Все товары, включая отсутствующие в продаже`}
				/>
			</div>
		</Form>
	);
});

export default StockBar;
