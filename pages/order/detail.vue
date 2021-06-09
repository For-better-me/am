<template>
	<view class="order_detail">
		<view class="top">
			<view :style="'padding-top:'+barHeight" class="mar-lr-30">
				<view class="f-34 color-fff mar-t-60" >订单{{orderInfo.status | formatStatus}}</view>
				<view class="f-24 color-fff mar-t-20">订单编号：{{orderInfo.sn}}</view>
			</view>
		</view>
		<view class="order_info">
			<view class="flex-center flex-lr pad-tb-20 border_bottom">
				<view class="flex-center">
					<image :src="orderInfo.images.length>0 && orderInfo.images[0]" mode="aspectFill" class="avatar_js"></image>
					<text class="f-26 color-1 mar-l-10">{{order.name}}</text>
				</view>
				<text class="f-26 color-orange">进行中</text>
			</view>
			<view class="flex-center flex-lr pad-tb-20 border_bottom">
				<image :src="projectInfo.img" mode="aspectFill" class="case_img"></image>
				<view class="flex-grow mar-l-20 color-1">
					<view class="f-28">{{projectInfo.title}}</view>
					<view class="f-26  mar-t-10">时长：{{projectInfo.duration}}分钟</view>
					<view class="flex-center flex-lr mar-t-10">
						<text>￥{{projectInfo.price}}</text>
						<text>X{{orderInfo.number}}</text>
					</view>
				</view>
			</view>
			<view class="flex-center flex-lr pad-tb-20 border_bottom color-1 f-26">
				<text>服务费用</text>
				<text>￥{{projectInfo.price * orderInfo.number}}</text>
			</view>
			<view class="flex-center flex-lr pad-tb-20 border_bottom color-1 f-26">
				<text>往返路费</text>
				<text>￥{{orderInfo.expenses}}</text>
			</view>
			<view class="flex-center flex-lr pad-tb-20 border_bottom color-1 f-26">
				<text>应付金额</text>
				<text>￥{{order.actual_total_price}}</text>
			</view>
		</view>
		<view class="order_info2 color-1">
			<view class="pad-tb-20 border_bottom f-30 bold">预约信息</view>
			<view class="pad-tb-20 flex-center flex-lr f-26 border_bottom">
				<text>用户昵称</text>
				<text>{{addrInfo.name}}</text>
			</view>
			<view class="pad-tb-20 flex-center flex-lr f-26 border_bottom">
				<text>预约时间</text>
				<text>{{'--'}}</text>
			</view>
			<view class="pad-tb-20 flex-center flex-lr f-26 border_bottom">
				<text>其他要求</text>
				<text>{{order.desc}}</text>
			</view>
			<image class="wx_code" :src="orderInfo.destroy_code"></image>
			<view class="f-22 align-c">向商户展示二维码扫码确认消费(点击二维码放大)</view>
		</view>
		<view class="order_info2 color-1">
			<view class="pad-tb-20 border_bottom f-30 bold">商户信息</view>
			<view class="pad-tb-20 flex-center flex-lr f-26 border_bottom">
				<text>商户名称</text>
				<text>{{orderInfo.merchant_title}}</text>
			</view>
			<view class="pad-tb-20 flex-center flex-lr f-26">
				<text>联系电话</text>
				<view class="flex-center">
					<text>{{orderInfo.phone}}</text>
					<image class="icon_call mar-l-10" src="../../static/img/icon_call.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="order_btn detail_btn">
			<button type="default" class="btn plain" v-if="orderInfo.status == 10 || orderInfo.status == 30">取消订单</button>
			<button type="default" class="btn primary mar-l-20" v-if="orderInfo.status == 10">在线支付</button>
			<button type="default" class="btn plain" v-if="orderInfo.status == 70 || orderInfo.status == 60">删除</button>
			<button type="default" class="btn primary" v-if="orderInfo.status == 60" @click="$util.navigateTo(`/pages/order/orderValue?id=${orderInfo.id}`)">去评价</button>
		</view>
	</view>
</template>

<script>
	import OrderApis from '@/apis/order.js'
	export default{
		name:'order_detail',
		data(){
			return{
				barHeight: this.$util.getStatusBarHeight(),
				orderInfo:{},
				addrInfo:{},
				projectInfo:{}
			}
		},
		filters:{
			// <!-- 10待支付，20已取消，30待消费，40申请售后已退款，50已完成，60待评价，70已完成 -->
			formatStatus(status){
				if(status){
					switch (status){
						case 10:
							return '待支付'
							break;
						case 30:
							return '待消费'
							break;
						case 60:
							return '待评价'
							break;
						case 70:
							return '已完成'
							break;
						default:
							break;
					}
				}
				return '--'
			}
		},
		onLoad(opt) {
			this.getInfo(opt.id)
		},
		methods:{
			getInfo(id){
				OrderApis.info({id}).then(res=>{
					this.orderInfo = res
					this.addrInfo = res.collect_address_info
					this.projectInfo = res.project_info
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.order_detail{
		padding-bottom: 130upx;
		.detail_btn{
			padding: 24upx 30upx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #FFFFFF;
			box-shadow: 0px -1px 8px 0px rgba(26, 25, 26, 0.2);
		}
		
	}
	.top{
		width: 100%;
		padding-bottom: 138upx;
		background: linear-gradient(90deg, #FFA846, #FF7686);
	}
	.icon_call{
		width: 34upx;
		height: 34upx;
	}
	.case_img{
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		flex-shrink: 0;
	}
	.order_info{
		width: 690upx;
		// height: 452upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0 auto;
		margin-top: -95upx;
		padding: 0 20upx;
		box-sizing: border-box;
		.avatar_js{
			width: 60upx;
			height: 60upx;
			border-radius: 100%;
		}
	}
	.order_info2{
		width: 690upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0 auto;
		margin-top:20upx;
		padding: 0 20upx;
		box-sizing: border-box;
		padding-bottom:30upx;
		.wx_code{
			width: 150upx;
			height: 150upx;
			margin: 30upx auto;
			display: block;
		}
	}
</style>
