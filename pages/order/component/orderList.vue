<template>
	<view class="order_list pad-20-30">
		<scroll-view scroll-y="true" v-if="list.length>0" class="order_scroll">
			<view class="order_item" v-for="n in list">
				<view class="flex-lr flex-center pad-tb-30 border_bottom">
					<view class="flex-center">
						<image src="../../../static/img/icon_shop2.png" class="icon_case_shop"></image>
						<text class="color-3 f-24 mar-l-10">喜来升养生会馆</text>
					</view>
					<text class="f-22 color-orange">待评价</text>
				</view>
				<view class="order_case">
					<image src="../../../static/img/banner.png" mode="scaleToFill" class="order_poster"></image>
					<view class="color-1 order_info">
						<view class="ellipsis f-24">水之春-中式按摩理疗</view>
						<view class="flex-center flex-lr f-20 mar-t-10">
							<text>价格：¥398</text>
							<text>时长：70分钟</text>
							<text>技师：大晨晨</text>
						</view>
						<view class="f-20 mar-t-20">总金额：¥498</view>
					</view>
				</view>
				<view class="order_btn">
					<button type="default" class="btn plain">取消订单</button>
					<button type="default" class="btn primary mar-l-20">在线支付</button>
				</view>
			</view>
		</scroll-view>
		<view  v-else>
			<no-data tip='您还没有已消费订单'></no-data>
			<button type="default" class="btn_add_order">去逛逛</button>
		</view>
		
	</view>
</template>

<script>
	import noData from '@/base/nodata.vue'
	export default{
		name:'order-list',
		components:{noData},
		data(){
			return{
				list:[3,4,5,6,7,8,9]
			}
		}
	}
</script>

<style lang="less" scoped>
	.order_scroll{
		height: calc(100vh - 118upx);
	}
	.order_item{
		border-radius: 20upx;
		background: #fff;
		padding: 0 20upx;
		margin-bottom: 20upx;
		.order_case{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
		}
		.order_poster{
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			flex-shrink: 0;
		}
		.order_info{
			width: 510upx;
		}
		
	}
	.btn_add_order{
		width: 690upx;
		height: 90upx;
		background: linear-gradient(90deg, #FFA846, #FF7686);
		border-radius: 11upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 320upx;
	}
</style>
