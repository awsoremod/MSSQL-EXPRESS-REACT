import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
	constructor() {
		this._types = [];
		this._brands = [];
		this._devices = [];
		this._selectedType = {};
		this._selectedBrands = [];
		this._page = 1;
		this._limit = 5;
		this._totalCount = undefined;
		this._sortPrice = 1;
		this._stock = 2;
		makeAutoObservable(this);
	}

	get stock() {
		return this._stock;
	}

	setStock(number) {
		this._stock = number;
	}

	get selectedBrands() {
		return this._selectedBrands;
	}

	setSelectedBrands(arr) {
		this._selectedBrands = arr;
	}

	pushSelectedBrands(brand) {
		this._selectedBrands.push(brand);
	}

	spliceSelectedBrands(index) {
		this._selectedBrands.splice(index, 1);
	}

	get sortPrice() {
		return this._sortPrice;
	}

	setSortPrice(number) {
		this._sortPrice = number;
	}

	get limit() {
		return this._limit;
	}

	setTotalCount(number) {
		this._totalCount = number;
	}

	get totalCount() {
		return this._totalCount;
	}

	setPage(number) {
		this._page = number;
	}

	get page() {
		return this._page;
	}

	setSelectedType(type) {
		this._selectedType = type;
	}

	get selectedType() {
		return this._selectedType;
	}

	setTypes(types) {
		this._types = types;
	}

	get types() {
		return this._types;
	}

	setBrands(brands) {
		this._brands = brands;
	}

	get brands() {
		return this._brands;
	}

	setDevices(devices) {
		this._devices = devices;
	}

	get devices() {
		return this._devices;
	}

	deleteDevice(index) {
		this.devices.splice(index, 1);
	}
}
