import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const enter = async (login, password) => {
	const { data } = await $host.post('api/admin/login', { login, password });
	localStorage.setItem('token', data.token);
	return jwt_decode(data.token);
};

export const check = async () => {
	const { data } = await $authHost.get('api/admin/auth');
	localStorage.setItem('token', data.token);
	return jwt_decode(data.token);
};

export const createType = async (type) => {
	const { data } = await $authHost.post('api/type', type);
	return data;
};

export const createBrand = async (brand) => {
	const { data } = await $authHost.post('api/brand', brand);
	return data;
};

export const createDevice = async (device) => {
	const { data } = await $authHost.post('api/device', device);
	return data;
};

export const adminFetchTypes = async () => {
	const { data } = await $authHost.get('api/admin/type');
	return data;
};

export const adminFetchBrands = async () => {
	const { data } = await $authHost.get('api/admin/brand');
	return data;
};
