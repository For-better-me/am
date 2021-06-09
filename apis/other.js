import _http from '../utils/http'
export default class Other {
    static banner() {
        return _http({
            url: 'api/Focus/getList',
            method: 'POST'
        })
    }
	static homeRecommend(data) {
	    return _http({
	        url: 'api/Recommend/getList',
	        method: 'POST',
			data
	    })
	}

}