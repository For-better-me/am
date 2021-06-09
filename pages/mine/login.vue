<template>
	<view class="login"></view>
</template>

<script>
	import MyApi from '../../apis/my.js'
	export default{
		name:'login',
		onLoad() {
			if(uni.getStorageSync('token')){
				this.getUser()
				uni.switchTab({
					url:'/pages/home/index'
				})
			}else{
				this.login()
			}
		},
		methods:{
			login(){
				let self = this
				uni.showLoading({
					mask:true,
					title:'登录中...'
				})
				uni.login({
					success(res) {
						MyApi.login({code:res.code}).then(data=>{
							uni.setStorageSync('token',data.token)
							self.getUser()
							uni.switchTab({
								url:'/pages/rent/index'
							})
						})
					}
				})
			},
			getUser() {
				MyApi.user().then(res => {
					uni.setStorageSync('phone',res.phone)
					uni.setStorageSync('isEmpower',res.is_empower)
				})
			}
		}
	}
</script>

<style>
</style>
