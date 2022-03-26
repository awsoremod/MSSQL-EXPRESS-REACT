import React, { useContext, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { HOME_ROUTE } from '../utils/consts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDevices } from '../http/deviceApi';

const DeviceList = observer(() => {
	const { idType } = useParams(); //move to props
	const { device } = useContext(Context);
	const navigate = useNavigate();
	let key = 0;
	const firstUpdate = useRef(true);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			fetchDevices(device.page, device.limit, device.sortPrice, device.selectedBrands, device.stock, idType).then((data) => {
				device.setDevices(data.rows);
				device.setTotalCount(data.count);
			});
		}
		//eslint-disable-next-line
	}, [device.page, device.sortPrice, device.selectedBrands.length, device.stock]);

	return (
		<Card>
			{device.devices.map((item) => (
				<Card
					body
					onClick={() => {
						navigate(HOME_ROUTE + '/' + idType + '/' + item.id);
					}}
					style={{ cursor: 'pointer' }}
					className="p-3"
					key={key++}
				>
					<div className="d-flex justify-content-between align-items-center">
						{item.type} {item.brand} {item.name}
						<div className="">{item.price} р.</div>
					</div>
				</Card>
			))}
		</Card>
	);
});

export default DeviceList;
