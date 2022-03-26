import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchDevices } from '../http/deviceApi';
import Pages from '../components/Pages';
import SortPrice from '../components/SortPrice';
import CheckbarBrand from '../components/CheckbarBrand';
import StockBar from '../components/StockBar';
import { useParams } from 'react-router-dom';

const Shop = () => {
	const [loading, setLoading] = useState(true);
	const { idType } = useParams();
	const { device } = useContext(Context);

	useEffect(() => {
		let promise1 = fetchBrands(idType, device.stock).then((data) => {
			device.setBrands(data);
		});
		let promise2 = fetchDevices(device.page, device.limit, device.sortPrice, device.selectedBrands, device.stock, idType).then((data) => {
			device.setDevices(data.rows);
			device.setTotalCount(data.count);
		});
		Promise.allSettled([promise1, promise2]).then(() => {
			setLoading(false);
		});

		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <div></div>;
	}

	return (
		<Container className="mt-4">
			<Row>
				<Col md={3}></Col>
				<Col md={9}>
					<SortPrice />
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<StockBar />
					<hr />
					<CheckbarBrand />
				</Col>
				<Col md={9}>
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
};

export default Shop;
