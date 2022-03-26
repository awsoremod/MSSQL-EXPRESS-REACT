import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchBrands } from '../http/deviceApi';
import { useParams } from 'react-router-dom';

const CheckbarBrand = observer(() => {
	const { idType } = useParams();
	const { device } = useContext(Context);
	const firstUpdate = useRef(true);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			fetchBrands(idType, device.stock).then((data) => {
				device.setBrands(data);
			});
		}
		//eslint-disable-next-line
	}, [device.stock]);

	return (
		<Form>
			{device.brands.map((brand) => (
				<div key={brand.id} className="mb-2">
					<Form.Check
						type="checkbox"
						id={`default-checkbox`}
						label={`${brand.name}`}
						onClick={() => {
							device.setPage(1);
							const index = device.selectedBrands.indexOf(brand);
							if (index === -1) {
								device.pushSelectedBrands(brand);
							} else {
								device.spliceSelectedBrands(index);
							}
						}}
					/>
				</div>
			))}
		</Form>
	);
});

export default CheckbarBrand;
