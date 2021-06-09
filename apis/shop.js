import _http from '../utils/http'
export default class Shop {
	static getShopList() {
	    return _http({
	        url: 'api/Artificer/getMerchantList',
	        method: 'POST'
	    })
	}
	static getShopInfo() {
	    return _http({
	        url: 'api/Artificer/getMerchantList',
	        method: 'POST'
	    })
	}
	static getNearbyShopList(data) {
	    return _http({
	        url: 'api/Nearbystore/getList',
	        method: 'POST',
			data
	    })
	}
	static updateFollow(data) {
	    return _http({
	        url: 'api/Merchant/addCollectionInfo',
	        method: 'POST',
			data,
			loading:false
	    })
	}
	static info(data) {
	    return _http({
	        url: 'api/Merchant/getInfo',
	        method: 'POST',
			data
	    })
	}
	static infoRecommend(data) {
	    return _http({
	        url: 'api/Merchant/getRecommendList',
	        method: 'POST',
			data
	    })
	}
	static infoTechnician(data) {
	    return _http({
	        url: 'api/Merchant/getArtificerList',
	        method: 'POST',
			data
	    })
	}
	static infoProject(data) {
	    return _http({
	        url: 'api/Merchant/getProjectList',
	        method: 'POST',
			data
	    })
	}
	static infoComment(data) {
	    return _http({
	        url: 'api/Merchant/getCommentList',
	        method: 'POST',
			data
	    })
	}
	static infoAbout(data) {
	    return _http({
	        url: 'api/Merchant/getAboutInfo',
	        method: 'POST',
			data
	    })
	}
	static infoBasic(data) {
	    return _http({
	        url: 'api/Merchant/getInfo',
	        method: 'POST',
			data
	    })
	}
	

}