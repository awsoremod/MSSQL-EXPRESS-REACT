import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchTypes } from '../http/deviceApi';
import { Context } from '../index';
import { HOME_ROUTE } from '../utils/consts';

const Home = observer(() => {
	const { device } = useContext(Context);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTypes()
			.then((data) => device.setTypes(data))
			.finally(() => setLoading(false));
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <div></div>;
	}

	return (
		<Container className="mt-5">
			<ListGroup>
				{device.types.map((type) => (
					<ListGroup.Item
						onClick={() => {
							device.setSelectedType(type);
							device.setPage(1);
							device.setSelectedBrands([]);
							device.setStock(2);
							device.setSortPrice(1);
							navigate(HOME_ROUTE + '/' + type.id);
						}}
						className="mt-auto "
						action
						variant="info"
						key={type.id}
					>
						{type.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
});

export default Home;
