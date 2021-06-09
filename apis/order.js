import _http from '../utils/http'
export default class Order {
	static list(data, type) {
		return _http({
			url:'api/order/getOrderList',
			method: 'POST',
			data
		})
	}
	static cancel(data, type,status) {
		let url = ''
		if(status == 60){
			url = 'api/Release/carpoolBeltCancel'
		}else{
			url = type == 1 ? 'api/Release/beltCancel' : 'api/Release/hitchCancel'
		}
		return _http({
			url,
			method: 'POST',
			data
		})
	}
	static del(data, type) {
		let url = type == 1 ? 'api/release/delCarpoolBeltInfo' : 'api/release/delCarpoolHitchInfo'
		return _http({
			url,
			method: 'POST',
			data
		})
	}
	static info(data) {
		return _http({
			url: 'api/order/getOrderInfo',
			method: 'POST',
			data
		})
	}
	static value(data) {
		return _http({
			url: 'api/order/addCommentInfo',
			method: 'POST',
			data
		})
	}
}
