
<script>
	import MyApi from './apis/my.js'
	export default{
		onLaunch: function() {
			this.login()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			login(){
				uni.login({
					success(res) {
						MyApi.login({code:res.code}).then(data=>{
							uni.setStorageSync('token',data.token)
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./static/css/common.less");
	/*每个页面公共css */
</style>
