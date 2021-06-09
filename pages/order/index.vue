<template>
	<view class="order">
		<view class="order_type">
			<view class="type_name" :class="currentOrder==0?'on':''">全部</view>
			<view class="type_name" :class="currentOrder==1?'on':''">待支付</view>
			<view class="type_name" :class="currentOrder==2?'on':''">待消费</view>
			<view class="type_name" :class="currentOrder==3?'on':''">待评价</view>
		</view>
		<swiper  @change='swiperChange' :current='currentOrder' class="swiper">
			<swiper-item>
				<order-list :type='10'></order-list>
			</swiper-item>
			<swiper-item>
				<order-list :type='20'></order-list>
			</swiper-item>
			<swiper-item>
				<order-list :type='30'></order-list>
			</swiper-item>
			<swiper-item>
				<order-list :type='40'></order-list>
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
			currentOrder:0
		},
		methods:{
			swiperChange(e){
				this.currentType = e.detail.current
			}
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
