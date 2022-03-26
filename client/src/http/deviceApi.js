import { $host } from './index';

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type');
	return data;
};

export const fetchBrands = async (id, stock) => {
	const { data } = await $host.get('api/brand', {
		params: {
			id,
			stock,
		},
	});
	return data;
};

export const fetchDevices = async (page, limit = 5, sort, brands, stock, id) => {
	const { data } = await $host.get('api/device', {
		params: {
			page,
			limit,
			sort,
			brands,
			stock,
			id,
		},
	});
	return data;
};

export const fetchOneDevice = async (id) => {
	const { data } = await $host.get('api/device/' + id);
	return data;
};
