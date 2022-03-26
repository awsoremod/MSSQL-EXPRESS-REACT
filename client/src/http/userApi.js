import { $host } from './index';

export const createUser = async () => {
	const { data } = await $host.post('api/user');
	localStorage.setItem('id', data);
	return data;
};

export const addBasket = async (idUser, idProduct) => {
	const { data } = await $host.post('api/basket/add', { idUser, idProduct });
	return data;
};

export const getBasket = async (idUser) => {
	const { data } = await $host.get('api/basket', {
		params: {
			idUser,
		},
	});
	return data;
};

export const deleteDevice = async (idUser, idDevice) => {
	const { data } = await $host.delete('api/basket', {
		params: {
			idUser,
			idDevice,
		},
	});
	return data;
};
