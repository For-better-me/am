<template>
	<view class="collection">
		<view class="list_type">
			<view class="list_type_bg" :class="currentType==0?'left':'right'">
				<text class="f-26" :class="currentType==0?'color-fff':'color-1'" @click="currentType=0">技师</text>
				<text class="f-26" :class="currentType==1?'color-fff':'color-1'" @click="currentType=1">门店</text>
			</view>
		</view>
		<swiper class="pad-20 swiper" @change='swiperChange' :current='currentType'>
			<swiper-item>
				<collect-scroll :type='currentType'></collect-scroll>
			</swiper-item>
			<swiper-item>
				<collect-scroll :type='currentType'></collect-scroll>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import CollectScroll from './component/collectScroll.vue'
	export default{
		name:'collection',
		components:{CollectScroll},
		data(){
			return{
				currentType:0
			}
		},
		methods:{
			swiperChange(e){
				this.currentType = e.detail.current
			}
		}
	}
</script>

<style lang="less" scoped>
	.collection .swiper{
		height: calc(100vh - 140upx) !important;
	}
	.list_type {
		width: 100%;
		height: 100upx;
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
			padding: 0 50upx;
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
