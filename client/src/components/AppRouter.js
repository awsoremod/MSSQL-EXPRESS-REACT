import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { HOME_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
	const { user } = useContext(Context);
	return (
		<Routes>
			{user.isAdmin && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path="*" element={<Navigate to={HOME_ROUTE} />} />
		</Routes>
	);
});

export default AppRouter;
