import _http from '../utils/http'
export default class My {
    static login(data) {
        return _http({
            url: 'api/user/login',
            method: 'POST',
			data,
			loading:false
        })
    }
	static user(data) {
	    return _http({
	        url: 'api/user/getInfo',
	        method: 'POST',
			data,
			loading:false
	    })
	}
	// 1技师收藏，2商户收藏
	static getCollectionList(type) {
	    return _http({
	        url: 'api/Collection/getCollectionList',
	        method: 'POST',
			data:{
				type:type+1
			}
	    })
	}
	// 1未使用，2已使用，3已过期
	static getMyCoupon(data) {
	    return _http({
	        url: 'api/Coupon/getUserCouponList',
	        method: 'POST',
			data
	    })
	}
	static vipInfo() {
	    return _http({
	        url: 'api/Member/getInfo',
	        method: 'POST',
	    })
	}
	
	static signInfo() {
	    return _http({
	        url: 'api/sign/getInfo',
	        method: 'POST',
	    })
	}
	static sign() {
	    return _http({
	        url: 'api/Sign/addSign',
	        method: 'POST',
	    })
	}
	
	
}