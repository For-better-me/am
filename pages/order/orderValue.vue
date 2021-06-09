<template>
	<view class="order_value">
		<view class="value_con">
			<view class="flex pad-tb-30">
				<image :src="orderInfo.project_info.img" mode="aspectFill" class="poster"></image>
				<view class="f-28 color-1 mar-l-20 mar-t-10">{{orderInfo.merchant_title}}-{{orderInfo.project_info.title}}</view>
			</view>
			<view class="pad-tb-30 border_top">
				<view class="flex-lr flex-center pad-lr-60">
					<view class="flex-center" @click="setLevel(10)">
						<image :src="valueParam.level==10?'../../static/img/value_good.png':'../../static/img/value_good2.png'" class="icon_value"></image>
						<view class="mar-l-10 f-26 " :class="valueParam.level == 10?'color-orange':'color-9'">好评</view>
					</view>
					<view class="flex-center" @click="setLevel(20)">
						<image :src="valueParam.level==20?'../../static/img/value_good.png':'../../static/img/value_good2.png'"  class="icon_value"></image>
						<view class="mar-l-10 f-26" :class="valueParam.level == 20?'color-orange':'color-9'">中评</view>
					</view>
					<view class="flex-center" @click="setLevel(30)">
						<image :src="valueParam.level==30?'../../static/img/value_m.png':'../../static/img/value_m2.png'"  class="icon_value"></image>
						<view class="mar-l-10 f-26" :class="valueParam.level == 30?'color-orange':'color-9'">差评</view>
					</view>
				</view>
			</view>
			<view class="">
				<textarea v-model="orderInfo.text" placeholder="请您对本次服务做出评价" class="textarea" />
			</view>
		</view>
		<view class="value_shop pad-30 bg-fff mar-t-15">
			<view class="flex-center">
				<view class="line"></view>
				<view class="f-30 color-3 mar-l-20">店铺评分</view>
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">真实描述</text>
				<star :score="valueParam.project_score" :desc='project_score' @setScore = 'setScore' />
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">服务技能</text>
				<star :score="valueParam.artificer_score" :desc='artificer_score' @setScore = 'setScore' />
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">服务态度</text>
				<star :score="valueParam.merchant_score" :desc='merchant_score' @setScore = 'setScore' />
			</view>
			
		</view>
		<view class="mar-t-15 pad-30 bg-fff">
			<view class="flex-center row_end" @click="switchAnonymous">
				<image :src="valueParam.is_anonymous==2?'../../static/img/icon_checked.png':'../../static/img/icon_radio.png'" class="icon_check"></image>
				<view class="f-26 color-3 mar-l-10">匿名评价</view>
			</view>
			<button type="default" class="btn_style mar-t-120">提交评价</button>
		</view>
	</view>
</template>

<script>
	import OrderApis from '@/apis/order.js'
	import star from '@/base/star.vue'
	export default{
		name:'order_value',
		components:{star},
		data(){
			return{
				valueParam:{
					text:null,
					level:10,
					project_score:0,
					artificer_score:0,
					merchant_score:0,
					is_anonymous:1,//1正常，2匿名
				},
				orderInfo:{}
			}
		},
		onLoad(opt) {
			this.getOrderInfo(opt.id)
		},
		methods:{
			getOrderInfo(id){
				OrderApis.info({id}).then(res=>{
					this.orderInfo = res
				})
			},
			setLevel(level){
				this.valueParam.level = level
			},
			setScore(key,n){
				this.valueParam[key] = n
			},
			switchAnonymous(){
				this.valueParam.is_anonymous = this.valueParam.is_anonymous==2?1:2
			},
			submit(){
				let data = this.orderInfo
				if(data.project_score == 0){
					this.$util.showToast('请对店铺的真实描述进行评价')
					return
				}
				if(data.artificer_score == 0){
					this.$util.showToast('请对店铺的服务技能进行评价')
					return
				}
				if(data.merchant_score == 0){
					this.$util.showToast('请对店铺的服务态度进行评价')
					return
				}
				if(!data.text){
					this.$util.showToast('请输入评价内容')
					return
				}
				OrderApis.value(data).then(res=>{
					this.$util.showToast('评价成功','success')
					uni.switchTab({
						url:'/pages/order/index'
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.mar-t-120{
		margin-top: 120upx;
	}
	.line{
		width: 4upx;
		height: 29upx;
		background: #FF4343;
	}
	.value_shop{
		.icon_star{
			display: block;
			width: 35upx;
			height: 33upx;
			margin-left: 30upx;
		}
	}
	.row_end{
		justify-content: flex-end;
	}
	.value_con{
		padding: 0  40upx 30upx;
		background: #fff;
		.poster{
			width: 138upx;
			height: 138upx;
			border-radius: 4upx;
			flex-shrink: 0;
		}
		.icon_value{
			width: 34upx;
			height: 34upx;
		}
		.textarea{
			width:100%;
			height: 250upx;
			background: #F8F8F8;
			border-radius: 10upx;
			padding: 25upx 30upx;
			box-sizing: border-box;
			font-size: 24upx;
		}
	}
</style>
