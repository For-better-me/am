import _http from '../utils/http'
export default class Addr {
	static list(data) {
		return _http({
			url:'api/Collectaddress/getList',
			method: 'POST',
			data
		})
	}
	static info(data) {
		return _http({
			url:'api/Collectaddress/getInfo',
			method: 'POST',
			data
		})
	}
	static add(data) {
		return _http({
			url:'api/Collectaddress/addInfo',
			method: 'POST',
			data
		})
	}
	static update(data) {
		return _http({
			url:'api/Collectaddress/updateInfo',
			method: 'POST',
			data
		})
	}
	static del(data) {
		return _http({
			url:'api/Collectaddress/delInfo',
			method: 'POST',
			data
		})
	}
	static setDefault(data) {
		return _http({
			url:'api/Collectaddress/updateCollectStatus',
			method: 'POST',
			data
		})
	}
}