<template>
	<view class="order">
		<view class="order_type">
			<view class="type_name on">全部</view>
			<view class="type_name">待支付</view>
			<view class="type_name">待消费</view>
			<view class="type_name">待评价</view>
		</view>
		<swiper :indicator-dots="false" :autoplay="false" class="swiper">
			<swiper-item>
				<order-list></order-list>
			</swiper-item>
			<swiper-item>
				<order-list></order-list>
			</swiper-item>
			<swiper-item>
				<order-list></order-list>
			</swiper-item>
			<swiper-item>
				<order-list></order-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import OrderList from './component/orderList.vue'
	export default{
		name:'order',
		components:{OrderList},
		data(){
			currentOrder:1
		}
	}
</script>

<style lang="less" scoped>
	.swiper{
		height: calc(100vh - 118upx);
	}
	.order_type{
		padding: 25upx 30upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.type_name{
			font-size: 28upx;
			color: #666;
			&.on{
				font-size: 34upx;
				color: #1a1a1a;
				line-height: 1;
				border-bottom: #FF4F1A solid 10upx;
			}
		}
	}
</style>
