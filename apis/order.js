import _http from '../utils/http'
export default class Order {
	// 10全部， 20待支付，30待消费，40待评价
	static list(data) {
		return _http({
			url:'api/order/getOrderList',
			method: 'POST',
			data
		})
	}
	static cancel(data) {
		return _http({
			url:'',
			method: 'POST',
			data
		})
	}
	static del(data) {
		return _http({
			url:'',
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
