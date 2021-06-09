<template>
	<view class="view_wrap">
		<view class="f-30 color-3">{{title}}</view>
		<view class="flex-center" >
			<view class="align-c page_menu" v-for="(item,i) in list" :key='i' @click="navTo(item.url)">
				<image :src="item.icon" mode="aspectFit"></image>
				<view class="f-24 color-6">{{item.desc}}</view>
			</view>
			<slot></slot>
		
		</view>
	</view>
</template>

<script>
	export default{
		name:'view_intel',
		props:['title','list'],
		methods:{
			navTo(url){
			console.log(url)
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.view_wrap{
		margin: 20upx 30upx 0 30upx;
		background: #FFFFFF;
		box-shadow: 0px 4px 8px 0px rgba(179, 195, 221, 0.3);
		border-radius: 20rpx;
		padding: 30upx;
	}
	.page_menu{
		width: 110upx;
		margin-right: 70rpx;
		margin-top: 45rpx;
		image{
			width: 46rpx;
			height: 46rpx;
			margin-bottom: 15rpx;
		}
	}
</style>
