<template>
	<view class="my_coupon">
		<no-data v-if="list.length==0" tip='暂时还没有未使用的优惠券' :img='noDataImg'></no-data>
		<view class="coupon_one flex-center flex-lr" v-for="item in list" :key='item.id'>
			<view class="coupon_num">
				<view class="flex-b">
					<text class="f-40">￥</text>{{item.avoid_price}}
				</view>
				<view class="btn_use f-26 color-orange mar-t-10">去使用</view>
			</view>
			<view class="coupon_con">
				<view class="f-30 color-1">满498减118优惠券</view>
				<view class="f-24 color-9 mar-t-10 coupon_rule ellipsis_2 mar-t-10">使用规则：{{item.rule_desc}}</view>
				<view class="f-22 color-9 pad-tb-10 border_top mar-t-10">有效期：{{item.use_start_time}}-{{item.use_end_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import noData from '@/base/nodata.vue'
	import MyApis from '@/apis/my.js'
	export default{
		name:'my_coupon',
		components:{noData},
		data(){
			return{
				list:[],
				noDataImg:require('../../static/img/no_coupon.png')
			}
		},
		onLoad() {
			this.getList(1)
		},
		methods:{
			getList(type){
				MyApis.getMyCoupon({type}).then(res=>{
					this.list = res.list
				})
			}
		}
		// onReachBottom() {
		// 	uni.showToast({
		// 		title:'到底部了'
		// 	})
		// }
	}
</script>

<style lang="less" scoped>
	.my_coupon{
		padding: 20upx 30upx;
		.coupon_one{
			width: 690upx;
			height: 208upx;
			background: url(../../static/img/my_coupon_bg.png) no-repeat center;
			background-size: 100%;
			margin-bottom: 20upx;
			.coupon_num{
				width: 208upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 68upx;
				font-weight: 600;
				color: #FFFFFF;
			}
			.btn_use{
				width: 120upx;
				height: 40upx;
				background: #FFFFFF;
				border-radius: 20upx;
				line-height: 40upx;
				text-align: center;
			}
			.coupon_con{
				width: 415upx;
				margin-right: 20upx;
				.coupon_rule{
					height: 64upx;
					overflow: hidden;
					line-height: 1.5;
				}
			}
		}
	}
</style>
