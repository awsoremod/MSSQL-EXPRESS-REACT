import { makeAutoObservable } from 'mobx';

export default class UserStore {
	constructor() {
		this._isAdmin = false;
		makeAutoObservable(this);
	}

	setIsAdmin(bool) {
		this._isAdmin = bool;
	}

	get isAdmin() {
		return this._isAdmin;
	}
}
