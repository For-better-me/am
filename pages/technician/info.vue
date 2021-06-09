<template>
	<view class="technician_info">
		<view class="shop_bg">
			<image class="shop_img" :src="info.banner_avatar_img" mode="aspectFill"></image>
			<view class="follow">
				<image src="../../static/img/icon_like.png" class="icon_like"></image>
				<text class="f-28 color-6" @click="updateFollow(info.id)">{{info.is_follow==1?'关注':'取消关注'}}</text>
			</view>
			<view class="pad-20-30 f-24 color-fff bg-black">下单付款后技师会主动联系您哦~~</view>
			<view class="flex-center data_count">
				<view class="align-c color-fff">
					<view class="f-30">{{info.follow_number}}</view>
					<view class="f-24 mar-t-7">关注人数</view>
				</view>
				<view class="align-c color-fff mar-l-30">
					<view class="f-30">{{info.order_number}}</view>
					<view class="f-24 mar-t-7">订单数量</view>
				</view>
				<view class="align-c color-fff mar-l-30">
					<view class="f-30">{{info.score}}</view>
					<view class="f-24 mar-t-7">评分</view>
				</view>
			</view>
			<view class="flex-lr">
				<view class="mar-t-20">
					<view class="flex-center" style="align-items: baseline;">
						<text class="color-1 f-36">{{info.name}}</text>
						<view class="f-24 color-1 mar-l-30">
							人脸对比相似度
							<text class="color-orange">88%</text>
						</view>
					</view>
					<view class="mar-t-20 flex-center">
						<view class="flex-center">
							<image src="../../static/img/icon_shop2.png"  class="icon_case_shop"></image>
							<text class="f-20 color-3 mar-l-20">{{info.merchant_title}}</text>
						</view>
						<view class="flex-center mar-l-100">
							<image src="../../static/img/icon_addr.png" class="icon_case_dun"></image>
							<text class="f-20 color-3 mar-l-20">{{info.distance}}</text>
						</view>
					</view>

				</view>
				<image :src="info.banner_avatar_img"  mode="aspectFill" class="shop_logo"></image>
			</view>
			<view class="mar-t-25 flex-center">
				<view class="flex-center mar-r-20" v-if="info.avatar_examine == 20">
					<image src="../../static/img/icon_rz1.png" class="rz_style"></image>
					<view class="f-20 color-orange">头像认证</view>
				</view>
				<view class="flex-center mar-l-30 mar-r-20" v-if="info.realname_examine == 20">
					<image src="../../static/img/icon_rz2.png" class="rz_style"></image>
					<view class="f-20 color-green">实名认证</view>
				</view>
				<view class="flex-center  mar-l-30" v-if="info.seniority_examine == 20">
					<image src="../../static/img/icon_rz3.png" class="rz_style"></image>
					<view class="f-20 color-blue">资质认证</view>
				</view>
			</view>
			<view class="flex mar-t-20">
				<image v-for="img in images" :src="img" :key='img' class="js_pics"></image>
			</view>
			<view class="f-24 color-9 mar-t-30">自我介绍：{{info.introduce}}</view>
			<view class="flex-center flex-lr mar-t-30">
				<view class="promise_item" v-for="n in 4">
					<image src="../../static/img/icon_promise2.png" class="icon_promise"></image>
					<text class="f-20 color-orange">平台保证</text>
				</view>
			</view>
		</view>
		<view class="flex-center bg-fff info_type">
			<view class="flex-grow f-30 item" :class="currentType==1?'color-orange on':'color-6'">服务项目</view>
			<view class="flex-grow f-30 item" :class="currentType==2?'color-orange on':'color-6'">下单须知</view>
		</view>
		<view class="pad-lr-30 bg-fff">
			<view class="technician_case" v-for="project in projectList" :key='project.id'>
				<image :src="project.img" mode="aspectFill" class="case_poster"></image>
				<view class="case_info flex-grow">
					<view class="f-28 color-3 ellipsis">{{project.title}} ></view>
					<view class="f-24 color-9 mar-t-10">服务时长：{{project.duration}}分钟</view>
					<view class="f-24 color-9 mar-t-10">价格：<text class="color-orange">${{project.price}}</text></view>
					<view class="f-24 color-9 mar-t-10">已售：{{project.order_number}}</view>
					<view class="flex-center mar-t-15 ">
						<button type="default" class="btn">下单</button>
						<button type="default" class="mar-l-30 btn">到店</button>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-fff mar-tb-20">
			<view class="pad-20-30 border_bottom f-28 color-1">下单须知</view>
			<view class="pad-20-30 color-6 f-24">
				<view class="needs">
					<view class="" v-html="info.order_matter"></view>
					<view class="shade_style"></view>
				</view>
				<view class="btn_more">查看更多</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	export default {
		name: 'technician_info',
		data() {
			return {
				currentType: 1,
				info:{},
				images:[],
				projectList:[]
			}
		},
		onLoad(opt) {
			this.getInfo(opt.id || 1)
		},
		computed:{
			...mapGetters({
				'location':'getLocation'
			})
		},
		methods:{
			getInfo(id){
				let data = {
					id,
					...this.location
				}
				ServiceApis.getTechnicianInfo(data).then(res=>{
					this.info = res
					this.images = res.images
					this.projectList = res.project_list
				})
			},
			updateFollow(artificer_id){
				ServiceApis.updateFollow({artificer_id}).then(res=>{
					let title = this.info.is_follow==1?'关注成功':'取消关注'
					this.info.is_follow = this.info.is_follow==1?2:1
					this.$util.showToast(title,'success')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.needs{
		position: relative;
		line-height: 1.8;
		.shade_style{
			position: absolute;
			bottom: 0;
			width: 690upx;
			height: 43upx;
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0.86, rgba(242, 242, 242, 0) 1);
			margin: 0 auto;
			margin-top: -50upx;
			z-index: 99;
		}
	}
	.technician_info {
		.btn_more{
			width: 140upx;
			height: 46upx;
			border: 1upx solid #999999;
			border-radius: 6upx;
			text-align: center;
			line-height: 46upx;
			font-size: 24upx;
			color: #333;
			margin: 30upx auto;
		}
		.technician_case {
			display: flex;
			align-items: center;
			padding: 20upx 0;
			border-bottom: #ebebeb solid 1upx;

			.ellipsis {
				width: 430upx;
			}

			.case_poster {
				width: 220upx;
				height: 220upx;
				border-radius: 15upx;
				margin-right: 20upx;
				flex-shrink: 0;
			}

			.btn {
				width: 120upx;
				height: 46upx;
				border-radius: 6upx;
				line-height: 46upx;
				font-size: 24upx;
				color: #fff;

				&:nth-of-type(1) {
					background: #FFA846;
				}

				&:nth-of-type(2) {
					background: #FF7686;
				}
			}

		}

		.info_type {
			margin: 20upx 0;
			width: 100%;
			height: 88upx;
			text-align: center;

			.item {
				height: 100%;
				line-height: 88upx;
			}

			.on {
				position: relative;

				&::after {
					content: '';
					display: block;
					width: 98upx;
					height: 2upx;
					background: #FF4F1A;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			}
		}

		.promise_item {
			width: 130upx;
			height: 40upx;
			background: #FFFFFF;
			box-shadow: 0upx 2upx 8upx 0upx rgba(0, 0, 0, 0.2);
			border-radius: 5upx;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon_promise {
				width: 18upx;
				height: 22upx;
				margin-right: 6upx;
			}

		}
	}

	.js_pics {
		width: 220upx;
		height: 220upx;
		border-radius: 10upx;
		margin-right: 18upx;

		&:nth-last-of-type(1) {
			margin-right: 0;
		}
	}

	.rz_style {
		width: 28upx;
		height: 20upx;
		margin-right: 10upx;
	}

	.color-y {
		color: #FDAA51
	}

	.color-g {
		color: #2AC14A
	}

	.color-b {
		color: #5FA6FD
	}

	.bg-black {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 88;
	}

	.data_count {
		position: absolute;
		left: 30upx;
		top: 200upx;
		z-index: 88;
	}

	.shop_bg {
		padding: 300upx 30upx 25upx 30upx;
		background: #ccc;
		position: relative;

		.shop_img {
			width: 100%;
			height: 300upx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
		}

		.shop_logo {
			width: 140upx;
			height: 140upx;
			border-radius: 100%;
			margin-top: -40upx;
			position: relative;
			z-index: 55;
			box-sizing: border-box;
			border: #fff solid 5upx;
		}

		.follow {
			min-width: 160upx;
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
			background: rgba(255, 255, 255, 0.3);
			padding: 0 30upx;
			box-sizing: border-box;
			.icon_like {
				width: 33upx;
				height: 29upx;
				margin-right: 9upx;
			}
		}
	}

	.shop_item_type {
		margin: 43upx 116upx;

		.normal {
			font-size: 26upx;
			color: #1a1a1a;
		}

		.on {
			font-size: 30upx;
			color: #1a1a1a;
			position: relative;

			&::after {
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
