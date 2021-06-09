// import UserApi from '../api/user'
let page = getCurrentPages()
let App = getApp()
let _http = function (opt) {//封装请求
    const _promise = new Promise((resolve, reject) => {
        let defaultOpt = {
            loading: true, // 是否显示Loading提示窗
            method: 'POST', // 请求方法，必须大写！！
            data: {}, // 入参
            header: {
                token: uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
            }
        }
        // 合并www.tjitfw.com
        let optReq = Object.assign({}, defaultOpt, opt)
        optReq.url = 'https://www.tjitfw.com/' + opt.url
        let loading = optReq.loading // 是否显示加载提示弹窗
        uni.request({
            url: optReq.url,
            method: optReq.method,
            data: optReq.data,
            header: optReq.header,
            success: (res) => {
                if (res.data.code == 1001) {
                    uni.clearStorageSync()
					uni.setStorageSync('prePage','')
					uni.reLaunch({
						url:'/pages/mine/login.vue'
					})

                } else if (res.data.code == 0) {
                    uni.hideLoading()
                    resolve(res.data.data)
                    console.log('请求成功', opt.url, res.data);
                } else {
                    uni.hideLoading()
                    reject(res.data)
                }
            },
            fail: (res) => {
                reject(res)
                console.log(opt.url, '通信接口失败')
            }
        })
        if (loading) {
            uni.showLoading({
                title: '加载中',
                mask: true
            })
        }
    })

    return _promise.catch(err => {
        uni.hideLoading()
        if (err.code == 1001) {
            uni.hideLoading()
            console.log('err1001', err.msg, opt)
        }
        else if (err.code == -1) {
            uni.showToast({
                title: err.msg,
                icon: 'none',
                duration: 2000
            })
            console.log('非err1001', err.msg, opt.url)
        }
        return Promise.reject({
            code: err.code,
            msg: err.msg
        })
    })

}


export default _http