function uploadImg(count = 1) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				let imgs = res.tempFilePaths;
				resolve(imgs)
			},
			fail(err) {
				reject(err)
			}
		})
	})

}

function uploadFile(imgs = []) { // 封装上传图片接口
	let self = this
	let index = 0 // 当前要上传第几个图片的索引
	let filePath = [] // 上传成功后的文件地址
	let token = uni.getStorageSync('token');
	uni.showLoading({
		title: '上传中',
		mask: true
	})

	return new Promise((resolve, reject) => {
		(function up() {
			uni.uploadFile({
				url: 'https://www.tjitfw.com/api/upload/uploadFile',
				filePath: imgs[index],
				name: 'file',
				success: res => {
					const data = JSON.parse(res.data);
					console.log(data)
					if (data.code == 0) {
						filePath.push(data.data)
						index++
						// 递归上传图片（微信上传接口不支持多个文件）
						if (imgs.length > index) {
							up()
						} else {
							uni.hideLoading()
							resolve(filePath)
						}
					} else {
						uni.hideLoading()
						reject('上传失败，请重试')
					}
				},
				fail: err => {
					uni.hideLoading()
					reject('上传失败，请重试')
				}
			})
		})()
	})
}

function preImg(urls, current = 0) {
	uni.previewImage({
		urls: urls,
		current: urls[current],
		fail: function() {
			uni.showToast({
				title: '预览失败，请重新尝试',
				icon: 'none'
			})
		}
	})
}

function weekDay(t) {
	var queryBeginDate = 'sd',
		queryEndDate = 'sds';
	let weekDay = getSelectDate(t)
	console.log(weekDay);
	return weekDay

	function formatDate(date) {
		console.log(date, '===========');
		var myyear = date.getFullYear();
		var mymonth = date.getMonth() + 1;
		var myweekday = date.getDate();
		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		return (mymonth + "月" + myweekday + "日");
	}

	// 获取本周、上周、本月的日期，每周从星期一开始
	function getSelectDate(t) {
		var now = new Date(); //当前日期 
		var nowDayOfWeek = now.getDay(); //今天本周的第几天 
		var nowDay = now.getDate(); //当前日 
		var nowMonth = now.getMonth(); //当前月 
		var nowYear = now.getFullYear(); //当前年 
		switch (t) {
			case "1": //本周
				queryBeginDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1));
				queryEndDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7));
				break;
			case "2": //上周
				queryBeginDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6));
				queryEndDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 0));
				break;
			case "3": //本月
				queryBeginDate = formatDate(new Date(nowYear, nowMonth, 1));
				queryEndDate = formatDate(new Date(new Date(nowYear, nowMonth + 1, 1) - 1000 * 60 * 60 * 24));
				break;
			default:
				break;
		}
		return {
			queryBeginDate,
			queryEndDate
		}

	}
}

function showToast(tip, icon = 'none') {
	uni.showToast({
		title: tip,
		icon: icon,
		duration: 2000
	})
}

function formatNum(n) {
	return n > 9 ? n : '0' + n
}
function getStatusBarHeight() {
  try {
    const res = uni.getSystemInfoSync()
    const rate = res.screenWidth / res.screenHeight
    let h = res.statusBarHeight
    if (h > 44) {
      return h + 4 + 'px'
    } else {
      return h + 8 + 'px'
    }

  } catch (e) {
    // Do something when catch error
  }
}
function goTechnicianPage(id){
	uni.navigateTo({
		url:'/pages/technician/info?id='+id
	})
}
function goShopPage(id){
	uni.navigateTo({
		url:'/pages/service/shopInfo?id='+id
	})
}
function call(phoneNumber){
	uni.makePhoneCall({
		phoneNumber
	})
}
export default {
	uploadImg,
	uploadFile,
	preImg,
	weekDay,
	showToast,
	formatNum,
	getStatusBarHeight,
	goShopPage,
	goTechnicianPage,
	call
}
