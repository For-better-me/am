<template>
	<view class="coupon_info coupon">
		<view class="pad-20-30 bg-fff">
			<view class="coupon_item">
				<view class="flex-center coupon_info">
					<view class="flex-center">
						<view class="price"><text class="f-36">￥</text>{{coupon.avoid_price}}</view>
						<view class="con">
							<view class="color-1 f-30 ellipsis">{{coupon.title}}</view>
							<view class="color-6 f-20 mar-t-7">上门使用</view>
							<view class="color-6 f-20 mar-t-10">{{coupon.threshold_price==0?'无门槛':`服务费用满${coupon.threshold_price}元可用`}}</view>
						</view>
					</view>
					<button type="default" class="btn_get" @click="add(coupon.id)">立即获取</button>
				</view>
			</view>
		</view>
		<view class="title bg-fff mar-tb-10 flex-center">
			<view class="pad-30 f-30 color-6 flex-grow align-c" :class="title==1?'on':''" @click="title=1">优惠详情</view>
			<view class="pad-30 f-30 color-6 flex-grow align-c" :class="title==2?'on':''" @click="title=2">预定须知</view>
		</view>
		<view class="coupon_content">
			<view class="f-28 color-1 pad-tb-30">适用项目</view>
			<view class="flex-center f-24 color-6 border_bottom pad-tb-20">
				<text class="w_2">项目名称</text>
				<text class="w_1">项目时长</text>
				<text class="w_1">项目价格</text>
			</view>
			<view class="flex-center f-24 color-6 mar-t-25" v-for="item in list" :key='item.id'>
				<text class="w_2">{{item.title}}</text>
				<text class="w_1">{{item.duration}}分钟</text>
				<text class="w_1">￥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import CouponApis from '@/apis/coupon.js'
	export default{
		name:'coupon_info',
		data(){
			return{
				coupon:{},
				list:[],
				title:1
			}
		},
		onLoad(opt) {
			this.getInfo(opt.id||3)
		},
		methods:{
			getInfo(id){
				CouponApis.info({id}).then(res=>{
					this.coupon = res.info;
					this.list =res.list
				})
			},
			add(id){
				CouponApis.add({id}).then(res=>{
					this.$util.showToast('领取成功','success')
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.coupon_info{
		.w_1{
			width: 160upx;
			flex-shrink: 0;
		}
		.w_2{
			width: 416upx;
			flex-shrink: 0;
		}
		.coupon_content{
			padding:0 30upx;
			background: #fff;
			min-height: calc(100vh - 340upx);
		}
		.coupon_item{
			background: url('../../static/img/bg_coupon.png') no-repeat center;
			background-size: 100%;
		}
		.title{
			.on{
				color: #FF4F1A;
				position: relative;
				&::after{
					content: '';
					display: block;
					width: 98upx;
					height: 2upx;
					background: #FF4F1A;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					margin: 0 auto;
				}
			}
		}
	}
</style>
