<template>
	<view class="home">
		<view class="top_bg"></view>
		<view class="addr" :style="'padding-top:'+barHeight">
			<text class="f-24 color-fff">天津</text>
		</view>
		<view class="bg-fff">
			<view class="banner">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="focus in focusList" :key='focus.img'>
						<image class="swiper-item" :src="focus.img" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="flex-lr flex-center pad-lr-20 promise">
				<view class="flex-center">
					<image src="../../static/img/icon_promise.png" class="icon"></image>
					<text class='font'>平台保证</text>
				</view>
				<view class="flex-center">
					<image src="../../static/img/icon_promise.png" class="icon"></image>
					<text class='font'>官方认证</text>
				</view>
				<view class="flex-center">
					<image src="../../static/img/icon_promise.png" class="icon"></image>
					<text class='font'>收费透明</text>
				</view>
				<view class="flex-center">
					<image src="../../static/img/icon_promise.png" class="icon"></image>
					<text class='font'>爽约包退</text>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="flex-lr flex-center ">
					<view class="menu_item" v-for="menu in menuListRow1" :key='menu.text' @click="goPage(menu.url)">
						<image :src="menu.icon" class="icon" mode="aspectFill"></image>
						<view class="f-24 color-1 align-c">{{menu.text}}</view>
					</view>
				</view>
				<view class="flex-lr flex-center mar-t-25">
					<view class="menu_item" v-for="menu in menuListRow2" :key='menu.text' @click="goPage(menu.url)">
						<image :src="menu.icon" class="icon" mode="aspectFill"></image>
						<view class="f-24 color-1 align-c">{{menu.text}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mar-t-10">
			<view class="list_type">
				<view class="list_type_bg" :class="currentType==1?'left':'right'">
					<text class="f-26" :class="currentType==1?'color-fff':'color-1'" @click="currentType=1">红牌推荐</text>
					<text class="f-26" :class="currentType==2?'color-fff':'color-1'" @click="currentType=2">今日推荐</text>
				</view>
			</view>
			<view class="pad-lr-20 mar-tb-10" v-if="isCanLoad">
				<recommend-scroll v-show="currentType==1" :type='1' ></recommend-scroll>
				<recommend-scroll v-show="currentType==2" :type='2' ></recommend-scroll>
			</view>
		</view>
	</view>
</template>

<script>
	import OtherApi from '../../apis/other.js'
	import recommendScroll from './component/recommendIScroll.vue'
	export default {
		name: 'home',
		components:{recommendScroll},
		data() {
			return {
				focusList:[],
				// 推荐技师
				currentType: 1,
				isCanLoad:false,//是否获取到地址
				barHeight: this.$util.getStatusBarHeight(),
				menuListRow2: [{
						icon: require('../../static/img/menu_sm.png'),
						text: '上门服务',
						url: '/pages/service/onCall'
					},
					{
						icon: require('../../static/img/menu_lq.png'),
						text: '领券中心',
						url: '/pages/service/coupon'
					},
					{
						icon: require('../../static/img/menu_md.png'),
						text: '附近门店',
						url: '/pages/service/shopNearby'
					},
					{
						icon: require('../../static/img/menu_qy.png'),
						text: '企业定制',
						url: ''
					}
				],
				menuListRow1: [{
						icon: require('../../static/img/menu_js.png'),
						text: '附近技师',
						url: '/pages/service/technicianNearby'
					},
					{
						icon: require('../../static/img/menu_yz.png'),
						text: '颜值专区',
						url: '/pages/service/technicianPretty'
					},
					{
						icon: require('../../static/img/menu_sf.png'),
						text: '手法专区',
						url: '/pages/service/feature'
					},
					{
						icon: require('../../static/img/menu_ns.png'),
						text: '女士专区',
						url: ''
					}

				]
			}
		},
		onLoad() {
			this.getFocus()
			this.getLocation()
			
		},
		methods:{
			getLocation(){
				// if(plus){
				// 	plus.geolocation.getCurrentPosition( function(position){
				// 	   console.log( position.addresses);
				// 	}, function ( e ) {
				// 	   console.log( e.message );
				// 	},{geocode:true});
				// }else{
					
				// }
				uni.getLocation({
				    type: 'wgs84',
				　　 geocode:true,
				    success: (res)=> {
				        this.$store.dispatch('setLocation',{lat:res.latitude,lng:res.longitude})
						this.isCanLoad= true
				    }
				});
			},
			getFocus(){
				OtherApi.banner().then(res=>{
					this.focusList=res.list
				})
			},
			goPage(url){
				uni.navigateTo({
					url
				})
			},
		}
		
	}
</script>

<style lang="less" scoped>
	.top_bg {
		width: 100%;
		height: 325upx;
		position: fixed;
		top: 0;
		left: 0;
		background: linear-gradient(90deg, #FFA846, #FF7686);
		z-index: 0;
	}

	.banner {
		width: 710upx;
		height: 300upx;
		margin: 20upx auto;
		border-radius: 20upx;
		overflow: hidden;

		.swiper {
			height: 300upx;
		}

		.swiper-item {
			width: 710upx;
			height: 300upx;
		}
	}

	.addr {
		padding-left: 20upx;
		line-height: 60upx;
		position: relative;
		z-index: 22;
	}

	.promise {
		.icon {
			width: 18upx;
			height: 20upx;
		}

		.font {
			font-size: 20upx;
			color: #568CED;
			margin-left: 5upx;
		}

	}

	.menu_wrap {
		padding: 30upx 39upx;

		.icon {
			width: 110upx;
			height: 113upx;
			margin-bottom: 5upx;
		}
	}

	.list_type {
		width: 100%;
		height: 95upx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.list_type_bg {
			width: 360upx;
			height: 60upx;
			background: #FFFFFF;
			box-shadow: 0px 0px 10px 0px rgba(69, 55, 126, 0.3);
			margin: 0upx auto;
			border-radius: 60upx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
			box-sizing: border-box;

			&::before {
				content: '';
				display: block;
				width: 158upx;
				height: 60upx;
				background: linear-gradient(0deg, #FF7686, #FFA34C, #FFA34C);
				z-index: 0;
				border-radius: 60upx;
				position: absolute;
				transition: all ease 0.4s;
			}

			&.left {
				&::before {
					content: '';
					display: block;
					left: 0;
				}
			}

			&.right {
				&::before {
					content: '';
					display: block;
					left: 202upx;
				}
			}

			text {
				display: block;
				line-height: 60upx;
				position: relative;
				z-index: 3;
			}
		}
	}

	
	
</style>
