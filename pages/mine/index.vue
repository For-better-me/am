<template>
	<view class="mine">
		<view class="user" :style="'padding-top:'+barHeight">
			<view class="flex-center user_info">
				<image :src="user.avatar" class="user_avatar"></image>
				<view class="flex-grow color-fff mar-l-20">
					<view class="flex-center">
						<text class="f-30">{{user.nickname || '无名'}}</text>
						<image src="../../static/img/icon_girl.png" class="icon_user mar-l-10"></image>
						<image src="../../static/img/icon_edit_user.png" class="icon_user mar-l-10"></image>
					</view>
					<view class="f-28 mar-t-15">去编辑资料完善个人简介吧</view>
				</view>
			</view>
			<view class="flex-center flex-lr mar-t-30">
				<view class="flex-center color-fff">
					<view class="align-c">
						<view class="f-30">{{user.coupon_number}}</view>
						<view class="f-26 mar-t-7">优惠券</view>
					</view>
					<view class="align-c mar-l-30" @click="navToPage('/pages/mine/collection')">
						<view class="f-30">{{user.follow_number}}</view>
						<view class="f-26 mar-t-7">关注</view>
					</view>
				</view>
				<view class="sign" @click="navToPage('/pages/mine/sign')">
					<image src="../../static/img/icon_sign.png" class="icon_sign"></image>
					<text class="mar-l-10 f-28 color-fff">{{user.is_sign==1?'签到':'已签到'}}</text>
				</view>
			</view>
			<view class="vip">
				<view class="flex-center">
					<image src="../../static/img/icon_un_vip.png" class="icon_vip"></image>
					<text class="vip_type">年卡会员</text>
				</view>
				<view class="vip_info">查看详情</view>
			</view>
		</view>
		<view class="mar-t-10 pad-lr-30 bg-fff">
			<view class="flex-center flex-lr border_bottom pad-tb-30">
				<view class="flex-center">
					<image src="../../static/img/icon_kf.png" class="icon_nav mar-r-20"></image>
					<view class="f-30 color-3">客服中心</view>
				</view>
				<image src="../../static/img/icon_arrow.png" class="icon_nav_arrow"></image>
			</view>
			<view class="flex-center flex-lr pad-tb-30">
				<view class="flex-center">
					<image src="../../static/img/icon_ts.png" class="icon_nav mar-r-20"></image>
					<view class="f-30 color-3">投诉中心</view>
				</view>
				<image src="../../static/img/icon_arrow.png" class="icon_nav_arrow"></image>
			</view>
		</view>
		<view class="mar-t-10 pad-lr-30 bg-fff" @click="navToPage('/pages/address/list')">
			<view class="flex-center flex-lr pad-tb-30 ">
				<view class="flex-center">
					<image src="../../static/img/icon_dz.png" class="icon_nav mar-r-20"></image>
					<view class="f-30 color-3">我的地址</view>
				</view>
				<image src="../../static/img/icon_arrow.png" class="icon_nav_arrow"></image>
			</view>
		</view>
		<view class="mar-t-10 pad-lr-30 bg-fff">
			<view class="flex-center flex-lr  pad-tb-30 border_bottom">
				<view class="flex-center">
					<image src="../../static/img/icon_yqm.png" class="icon_nav mar-r-20"></image>
					<view class="f-30 color-3">绑定邀请码</view>
				</view>
				<image src="../../static/img/icon_arrow.png" class="icon_nav_arrow"></image>
			</view>
			<view class="flex-center flex-lr  pad-tb-30">
				<view class="flex-center">
					<image src="../../static/img/icon_sz.png" class="icon_nav mar-r-20"></image>
					<view class="f-30 color-3">设置</view>
				</view>
				<image src="../../static/img/icon_arrow.png" class="icon_nav_arrow"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import MyApis from '@/apis/my.js'
	export default {
		name: '',
		components: {},
		data() {
			return {
				barHeight: this.$util.getStatusBarHeight(),
				user:{}
			}
		},
		onLoad() {
		},
		onShow() {
			this.getUser()
		},
		methods: {
			getUser(){
				MyApis.user().then(data=>{
					this.user = data
				})
			},
			navToPage(url){
				uni.navigateTo({
					url
				})
			}
				
		},
		onShareAppMessage() {
		    return {
		      title: '按摩',
		      path: '',  // 自定义的分享路径，点击分享的卡片之后会跳转这里定义的路由
		      imageUrl: '', // 图片路径
		    };
		}
	}
</script>

<style lang="less" scoped>
	.user{
		// height: 400upx;
		width: 100%;
		background: linear-gradient(90deg, #FFA846, #FF7686);
		padding: 0 30upx;
		box-sizing: border-box;
		.user_info{
			margin-top: 86upx;
		}
		.user_avatar{
			width: 130upx;
			height: 130upx;
			border-radius: 100%;
			flex-shrink: 0;
		}
		.sign{
			width: 160upx;
			height: 60upx;
			border: 1upx solid #FFFFFF;
			border-radius: 30upx;
			background: rgba(#fff,0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.vip{
			width: 690upx;
			height: 84upx;
			margin-top: 40upx;
			background: linear-gradient(-49.001000000000005deg, #444444 0%, #222222 100%);
			border-radius: 16upx 16upx 0upx 0upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;
			box-sizing: border-box;
			.vip_type{
				font-size: 30upx;
				color: #FDE4B8;
				margin-left: 20upx;
			}
			.vip_info{
				width: 130upx;
				height: 48upx;
				background: linear-gradient(90deg, #FDF1D8 0%, #EFD29F 100%);
				border-radius: 24upx;
				font-size: 24upx;
				color: #333;
				line-height: 48upx;
				text-align: center;
			}
		}
	}
</style>
