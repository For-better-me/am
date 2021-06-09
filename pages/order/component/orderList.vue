<template>
	<view class="order_list pad-20-30">
		<scroll-view scroll-y="true" v-if="list.length>0" class="order_scroll" @scrolltolower='loadMore'>
			<view class="order_item" v-for="order in list" :key='order.sn'>
				<view class="flex-lr flex-center pad-tb-30 border_bottom">
					<view class="flex-center" @click="$util.goShopPage(order.merchant_id)">
						<image src="../../../static/img/icon_shop2.png" class="icon_case_shop"></image>
						<text class="color-3 f-24 mar-l-10">{{order.merchant_title}}</text>
					</view>
					<text class="f-22 color-orange">{{order.status | formatStatus}}</text>
				</view>
				<view class="order_case">
					<image :src="order.project_info.img" mode="scaleToFill" class="order_poster"></image>
					<view class="color-1 order_info">
						<view class="ellipsis f-24">{{order.project_info.title}}</view>
						<view class="flex-center flex-lr f-20 mar-t-10">
							<text>价格：¥{{order.project_info.price}}</text>
							<text>时长：{{order.project_info.duration}}分钟</text>
							<text>技师：{{order.name}}</text>
						</view>
						<view class="f-20 mar-t-20">总金额：¥{{order.actual_total_price}}</view>
					</view>
				</view>
				<view class="order_btn">
					<button type="default" class="btn plain">取消订单</button>
					<button type="default" class="btn primary mar-l-20">在线支付</button>
				</view>
			</view>
		</scroll-view>
		<view  v-else>
			<no-data tip='您还没有相关订单'></no-data>
			<button type="default" class="btn_add_order" @click="goHome">去逛逛</button>
		</view>
		
	</view>
</template>

<script>
	import noData from '@/base/nodata.vue'
	import listMixin from '@/utils/listMixin.js'
	import OrderApis from '@/apis/order.js'
	export default{
		name:'order-list',
		components:{noData},
		mixins:[listMixin],
		props:['type'],
		data(){
			return{
				listQuery:{},
				http:OrderApis.list
			}
		},
		mounted() {
			this.listQuery = Object.assign({},{type:this.type})
		},
		methods:{
			goHome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
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
		}
		
	}
</script>

<style lang="less" scoped>
	.order_scroll{
		height: calc(100vh - 118upx);
	}
	.order_item{
		border-radius: 20upx;
		background: #fff;
		padding: 0 20upx;
		margin-bottom: 20upx;
		.order_case{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
		}
		.order_poster{
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			flex-shrink: 0;
		}
		.order_info{
			width: 510upx;
		}
		
	}
	.btn_add_order{
		width: 690upx;
		height: 90upx;
		background: linear-gradient(90deg, #FFA846, #FF7686);
		border-radius: 11upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 320upx;
	}
</style>
