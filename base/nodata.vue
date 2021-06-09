<template>
	<view class="no_data">
		<image :src="img" mode="aspectFit"></image>
		<text>{{tip}}</text>
	</view>
</template>

<script>
	export default {
		name: 'no_data',
		props:{
			tip:{
				type:String,
				required:false,
				default:'暂无相关数据'
			},
			img:{
				required:false,
				default:require('../static/img/no_data.png')
			}
		}
	}
</script>

<style lang="less" scoped>
	.no_data{
		text-align: center;
		margin-top: 22%;
		image{
			width: 507upx;
			height: 314upx;
		}
		text{
			font-size: 28upx;
			color: #999;
			display: block;
			margin-top: 89upx;
		}
	}
</style>
