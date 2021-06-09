<template>
	<view class="shop_info">
		<view class="shop_bg">
			<image class="shop_img" :src="basicInfo.logo" mode="aspectFill"></image>
			<view class="follow">
				<image src="../../static/img/icon_like.png" class="icon_like"></image>
				<text class="f-28 color-6" @click="follow(basicInfo.id)">{{basicInfo.is_collection==1?'关注':'取消关注'}}</text>
			</view>
			<view class="flex-lr">
				<view class="mar-t-20">
					<text class="f-36 color-1">{{basicInfo.title}}</text>
					<view class="flex-center mar-t-10">
						<image src="../../static/img/icon_time2.png" class="icon_time"></image>
						<text class="f-20 color-3 mar-l-10">{{basicInfo.business_hours}}</text>
					</view>
				</view>
				<image :src="basicInfo.logo" mode="aspectFill" class="shop_logo"></image>
			</view>
		</view>
		<view class="shop_item_type flex-lr flex-center">
			<view :class="currentType == 1?'on':'normal'" @click="currentType=1">首页</view>
			<view :class="currentType == 2?'on':'normal'" @click="currentType=2">技师</view>
			<view :class="currentType == 3?'on':'normal'" @click="currentType=3">项目</view>
			<view :class="currentType == 4?'on':'normal'" @click="currentType=4">用户评价</view>
			<view :class="currentType == 5?'on':'normal'" @click="currentType=5">关于我们</view>
		</view>
		<view class="">
			<home v-if="currentType==1" :merchant_id='basicInfo.id' @all='currentType=2'></home>
			<case v-if="currentType==3" :merchant_id='basicInfo.id'></case>
			<value v-if="currentType==4" :merchant_id='basicInfo.id'></value>
			<us v-if="currentType==5" :merchant_id='basicInfo.id'></us>
		</view>
	</view>
</template>

<script>
	import Case from './component/shopCase.vue'
	import Home from './component/shopHome.vue'
	import value from './component/shopValue.vue'
	import Us from './component/shopUs.vue'
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'shop_info',
		components:{Home,Case,value,Us},
		data(){
			return{
				currentType:5,
				basicInfo:{
					id:1
				}
			}
		},
		onLoad(opt) {
			this.getBase(opt.id||1)
		},
		methods:{
			getBase(merchant_id){
				ShopApis.infoBasic({merchant_id}).then(res=>{
					this.basicInfo = res
				})
			},
			follow(merchant_id){
				ShopApis.updateFollow({merchant_id}).then(res=>{
					let title = this.basicInfo.is_collection==1?'关注成功':'取消关注'
					this.basicInfo.is_collection = this.basicInfo.is_collection==1?2:1
					this.$util.showToast(title,'success')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop_bg{
		padding: 260upx 30upx 25upx 30upx;
		background: #fff;
		position: relative;
		.shop_img{
			width: 100%;
			height: 260upx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
		}
		.shop_logo{
			width: 140upx;
			height: 140upx;
			border-radius: 0upx 20upx 0upx 20upx;
			margin-top: -30upx;
			position: relative;
			z-index: 55;
		}
		.follow{
			width: 160upx;
			height: 60upx;
			border: 1upx solid #FFFFFF;
			border-radius: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			z-index: 3;
			top: 100upx;
			right: 30upx;
			background: rgba(255,255,255,0.3);
			.icon_like{
				width: 33upx;
				height: 29upx;
				margin-right: 9upx;
			}
		}
	}
	.shop_item_type{
		margin: 43upx 116upx;
		.normal{
			font-size: 26upx;
			color: #1a1a1a;
		}
		.on{
			font-size: 30upx;
			color: #1a1a1a;
			position: relative;
			&::after{
				content: '';
				display: block;
				position: absolute;
				bottom: -5upx;
				width: 100%;
				height: 10upx;
				background: linear-gradient(87deg, #FF4F1A 0%, #F9D2C6 100%);
			}
		}
	}
</style>
