import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { ADMIN_ROUTE, BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from './utils/consts';

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
];

export const publicRoutes = [
	{
		path: HOME_ROUTE + '/:idType',
		Component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: HOME_ROUTE + '/:idType/:idDevice',
		Component: DevicePage,
	},
	{
		path: HOME_ROUTE,
		Component: Home,
	},
	{
		path: BASKET_ROUTE,
		Component: Basket,
	},
];
