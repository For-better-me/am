import _http from '../utils/http'
export default class Coupon {
    static list() {
        return _http({
            url: '/api/Coupon/getList',
            method: 'POST',
        })
    }
	static info(data) {
	    return _http({
	        url: '/api/Coupon/getInfo',
	        method: 'POST',
			data
	    })
	}
	static add(data) {
	    return _http({
	        url: '/api/Coupon/addInfo',
	        method: 'POST',
			data,
			loading:false
	    })
	}
	

}