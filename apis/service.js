import _http from '../utils/http'
export default class Service {
    static getNearbyTechnicianList(data) {
        return _http({
            url: 'api/Artificer/getNearbyList',
            method: 'POST',
			data
        })
    }
	static getPrettyTechnicianList(data) {
	    return _http({
	        url: 'api/Artificer/getPrettyList',
	        method: 'POST',
			data
	    })
	}
	static getAllTechnicianList(data) {
	    return _http({
	        url: 'api/Artificer/getPrettyList',
	        method: 'POST',
			data
	    })
	}
	static getTechnicianInfo(data) {
	    return _http({
	        url: 'api/Artificer/getInfo',
	        method: 'POST',
			data
	    })
	}
	static getFeature(data) {
	    return _http({
	        url: 'api/Artificer/getTechniqueList',
	        method: 'POST',
			data
	    })
	}
	static updateFollow(data) {
	    return _http({
	        url: 'api/Collection/addCollectionInfo',
	        method: 'POST',
			data
	    })
	}
	static onCallType(data) {
	    return _http({
	        url: 'api/Doorserver/getCategoryList',
	        method: 'POST',
			data
	    })
	}
	static onCallList(data) {
	    return _http({
	        url: 'api/Doorserver/getList',
	        method: 'POST',
			data
	    })
	}

}