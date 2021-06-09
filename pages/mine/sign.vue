<template>
	<view class="sign" :style="'padding-top:'+barHeight">
		<view class="sign_day flex-center">
			当前连续签到：<text class="day_text">5</text> 天
		</view>
		<view class="sign_btn">
			<image src="../../static/img/icon_rili.png" class="icon_rili"></image>
			<text class="f-36 color-fff">立即签到</text>
		</view>
		<view class="flex-center flex-lr">
			<view class="sign_count" v-for="n in 7">
				<view class="count">
					<text class="f-26 color-fff">+1</text>
				</view>
				<view class="f-22 color-fff mar-t-7">4.22</view>
			</view>
		</view>
		<view class="ri_li mar-t-30">
			<view class="rili_top"></view>
			<view class="rili_con">
				<view class="pad-tb-30 f-28 color-3 align-c">签到日历 2020年04月</view>
				<view class="rili_month border_top">
					<text class="rili_day" v-for="n in 30">{{n+1}}</text>
					<text class="rili_day finish">23</text>
					<text class="rili_day on">32</text>
				</view>
			</view>
		</view>
		<view class="f-28 color-1 mar-t-30 align-c">每日签到即可获得优惠券一张</view>
		<button type="default" class="btn_style mar-t-100">回到首页</button>
	</view>
	
</template>

<script>
	export default{
		name:'sign',
		data(){
			return{
				barHeight: this.$util.getStatusBarHeight(),
			}
		}
	}
</script>

<style lang="less" scoped>
	.sign{
		width: 100%;
		padding-left: 30upx;
		padding-right: 30upx;
		min-height: 100vh;
		box-sizing: border-box;
		background: linear-gradient(183deg, rgba(255, 118, 134, 0.72) 28.000000000000004%, rgba(255, 163, 77, 0.25) 75%, rgba(242, 242, 242, 0) 100%);
		.sign_day{
			font-size: 26upx;
			color: #DEECFF;
			margin-top: 90upx;
			letter-spacing: 2upx;
			.day_text{
				font-size: 36upx;
				color: #FFD74A;
			}
		}
		.icon_rili{
			width: 36upx;
			height: 36upx;
			margin-right: 10upx;
		}
		.sign_btn{
			width: 300upx;
			height: 88upx;
			background: linear-gradient(0deg, #FFAE2E 0%, #FFC659 100%);
			box-shadow: 0upx 5upx 15upx 0upx rgba(255, 118, 134, 0.6);
			border-radius: 44upx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 50upx auto;
		}
		.sign_count{
			.count{
				width: 54upx;
				height: 54upx;
				background: #FFAE2E;
				border-radius: 50%;
				line-height: 54upx;
				text-align: center;
				position: relative;
				background: #FFAE2E;
				box-sizing: border-box;
				&::after{
					content: '';
					display: block;
					width: 65upx;
					height: 10upx;
					background: #FFAE2E;
					position: absolute;
					top: 22upx;
					left: 54upx;
					z-index: 99;;
				}
				&:nth-last-of-type(1)::after{
					content: '';
					display: none;
				}
				&.on{
					background: #FF4F1A;
					border: 3upx solid;
					border-image: linear-gradient(0deg, #FFE3CC, #FFE5D0) 10 10;
					box-shadow: 0px 5px 15px 0px rgba(38, 92, 201, 0.5);
				}
			}
		}
		.ri_li{
			.rili_top{
				width: 690upx;
				height: 24upx;
				background: linear-gradient(0deg, #FF7686 0%, #FF7686 100%);
				box-shadow: 0upx 5upx 15upx 0upx rgba(255, 79, 26, 0.5), 0upx 5upx 5upx 0upx rgba(255, 255, 255, 0.5);
				border-radius: 12upx;
			}
			.rili_con{
				width: 665upx;
				background: #FFFFFF;
				box-shadow: 0upx 5upx 10upx 0upx rgba(38, 88, 190, 0.3);
				border-radius: 0upx 0upx 16upx 16upx;
				margin: 0 auto;
				margin-top: -12upx;
				.rili_month{
					padding: 20upx 10upx;
					.rili_day{
						display: inline-block;
						vertical-align: top;
						width: 2em;
						text-align: center;
						font-size: 28upx;
						color: #8D9AB0;
						text-align: center;
						margin: 10upx 19upx;
						height: 2em;
						border-radius: 100%;
						line-height: 2em;
						&.finish{
							background: #d9d9d9;
						}
						&.on{
							background: linear-gradient(0deg, #FF7686 17%, #FFA846 100%);
							box-shadow: 0upx 4upx 10upx 0upx rgba(255, 118, 134, 0.5);
							color: #fff;
						}
					}
				}
			}
		}
		
	
	}
</style>
