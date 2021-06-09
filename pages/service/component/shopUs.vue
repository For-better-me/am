<template>
	<view class="shop_us">
		<view class="pad-20-30 bg-fff">
			<view class="flex-center">
				<image style="width: 32upx;height: 28upx;" src="../../../static/img/icon_shop3.png" mode="aspectFit"></image>
				<view class="mar-l-20">
					<view class="f-24 color-1">{{info.title}}</view>
					<view class="f-20 color-6 mar-t-7">营业时间 {{info.business_hours}}</view>
				</view>
			</view>
			<view class="flex-center mar-t-25">
				<image style="width: 26upx;height: 26upx;" src="../../../static/img/icon_floor.png" mode="aspectFit"></image>
				<view class="mar-l-20">
					<view class="f-24 color-1">{{info.address}}</view>
					<view class="f-20 color-6 mar-t-7">营业时间 {{info.business_hours}}</view>
				</view>
			</view>
		</view>
		<view class="pad-20-30 mar-t-10 bg-fff">
			<view class="f-28 color-1 bold">门店介绍</view>
			<view class="mar-t-20" v-html="info.introduce"></view>
		</view>
	</view>
</template>

<script>
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'shop_us',
		props:['merchant_id'],
		data(){
			return{
				info:{}
			}
		},
		mounted() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				let data = {
					merchant_id:this.merchant_id
				}
				ShopApis.infoAbout(data).then(res=>{
					this.info = res
				})
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
