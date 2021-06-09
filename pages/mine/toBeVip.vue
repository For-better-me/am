<template>
	<view class="to_be_vip">
		<view class="flex-center">
			<image src="../../static/img/icon_un_vip.png" class="icon_vip"></image>
			<view class="mar-l-10 f-24 color-6">您还未开通会员，<text class="color-orange">开通可享受会员特权</text></view>
		</view>
		<view class="flex-center flex-lr">
			<view class="vip_card align-c " :class="current==index?'on':''"  v-for="(vip,index) in list" :key='vip.id' @click="current=index">
				<view class="recommend">推荐</view>
				<view class="name">{{vip.title}}</view>
				<view class="price"><text class='f-24'>￥</text>{{vip.price}}</view>
				<view class="price_day">￥{{vip.average}}/天</view>
				<view class="choosed" v-if="current == index">
					<!-- <image src="" mode=""></image> -->
				</view>
			</view>
		</view>
		<view class="vip_tip  mar-t-25">
			<image src="../../static/img/vip_bg.png" class="bg_vip"></image>
			<view class="vip_info" v-html="desc"></view>
		</view>
		<view class="btn_vip">
			<button type="default" class="btn_style">立即开通</button>
		</view>
	</view>
</template>

<script>
	import MyApis from '@/apis/my.js'
	export default{
		name:'to_be_vip',
		data(){
			return{
				current:0,
				list:[],
				desc:''
			}
		},
		onLoad() {
			this.getVipInfo()
		},
		methods:{
			getVipInfo(){
				MyApis.vipInfo().then(res=>{
					this.list = res.list
					this.desc = res.vip_desc
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.vip_tip{
		position: relative;
		width: 710upx;
		height: 1013upx;
		box-sizing: border-box;
		.vip_info{
			position: absolute;
			left: 66upx;
			right: 66upx;
			top: 135upx;
			z-index: 1;
		}
	}
	.bg_vip{
		width: 710upx;
		height: 1013upx;
		
	}
	.btn_vip{
		box-shadow: 0px -1px 7px 0px rgba(26, 25, 26, 0.23);
		padding: 20upx 30upx;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
	}
	.to_be_vip{
		padding: 28upx;
		background: #Fff;
		padding-bottom: 150upx;
		.vip_card{
			width: 222upx;
			height: 292upx;
			border: 2upx solid #E4C487;
			box-shadow: 0upx 4upx 10upx 0upx rgba(249, 253, 147, 0.5);
			border-radius: 17upx;
			position: relative;
			overflow: hidden;
			box-sizing: border-box;
			margin-top: 39upx;
			&.on{
				background: linear-gradient(0deg, #E0BD7B 0%, #F0D8A8 100%);
				box-shadow: 0px 4px 10px 0px rgba(249, 253, 147, 0.5);
				.name{
					color: #6E4C2B;
				}
				.price{
					color: #543115;
				}
				.recommend{
					width: 62upx;
					height: 35upx;
					background: #DDAE52;
					border-radius: 12upx 0upx 12upx 0upx;
					position: absolute;
					left: 0;
					top: 0;
					font-size: 24upx;
					color: #FFFFFF;
					z-index: 22;
				}
				.choosed{
					width: 0;
					height: 0;
					border-bottom: #DDAE52 solid 34upx;
					border-right: #DDAE52 solid 34upx;
					border-left:transparent solid 34upx;
					border-top:transparent solid 34upx;
					z-index: 22;
					position: absolute;
					right: 0;
					bottom: 0;
				}
			}
			.name{
				font-size: 24upx;
				color: #6E4C2B;
				margin-top: 80upx;
			}
			.price{
				font-size: 48upx;
				color: #DDAE52;
				margin-top: 10upx;
			}
			.price_day{
				font-size: 24upx;
				color: #6C4827;
				position: absolute;
				left: 13upx;
				bottom: 10upx;
			}
		}
	}
</style>
