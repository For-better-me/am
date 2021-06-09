<template>
	<view class="shop_nearby">
		<view class="case_style" v-for="shop in list" :key='shop.id'>
			<image :src="shop.logo" mode="aspectFill" class="poster"></image>
			<view class="case_detail">
				<view class="flex-center flex-lr">
					<text class="f-28 color-3 title">{{shop.title}}</text>
					<star :score="shop.score"></star>
				</view>
				<view class="flex-center flex-lr mar-t-20">
					<view class="flex-center">
						<image src="../../static/img/icon_addr.png" class="icon_case_dun"></image>
						<text class="f-20 color-3 mar-l-4">{{shop.address}}</text>
					</view>
					<text class="f-20 color-3">{{shop.distance}}km</text>
				</view>
				<view class="flex-lr mar-t-20">
					<view class="shop_item" v-for="item in shop.project_list" :key='item.title'>
						<image class="shop_item_poster" :src="item.img" mode="aspectFill"></image>
						<view class="shop_item_info">
							<text class="f-22 color-3 ellipsis">{{item.title}}</text>
							<view class="f-20 color-orange mar-t-7">¥{{item.price}} <text class="f-16 color-3">/次</text></view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="shop_empty"  v-if="list.length==0">
			<image class="shop_empty_img" src="../../static/img/no_shop.png" mode=""></image>
			<view class="f-28 color-9 align-c">暂无门店，敬请期待</view>
		</view>
		<view class="fix_bottom" v-if="isShow">
			<view class="flex-center">
				<image src="../../static/img/p_close.png" class="icon_close" @click="isShow=false"></image>
				<view class="color-1 f-30 mar-l-20">我是店主，我要入驻~~</view>
			</view>
			<button type="default" class="btn" @click="$util.call(phoneNumber)">立即咨询</button>
		</view>
		
	</view>
</template>

<script>
	import listMixin from '@/utils/listMixin.js'
	import {mapGetters} from 'vuex'
	import ShopApis from '@/apis/shop.js'
	import star from '@/base/star.vue'
	export default{
		name:'shop_nearby',
		mixins:[listMixin],
		components:{star},
		data(){
			return{
				listQuery:{
					lat:null,
					lng:null
				},
				http:ShopApis.getNearbyShopList,
				phoneNumber:null,
				isShow:true
			}
		},
		created() {
			this.listQuery = Object.assign({},this.location)
			this.getList().then(res=>{
				this.phoneNumber = res.contact
			})
		},
		computed:{
			...mapGetters({
				'location':'getLocation'
			})
		}
	}
</script>

<style lang="less" scoped>
	.shop_empty_img{
		width: 508upx;
		height: 314upx;
		margin: 0 auto;
		margin-top: 300upx;
		margin-bottom: 88upx;
		display: block;
	}
	.shop_nearby{
		position: relative;
		padding-bottom: 100upx;
		&::after{
			content: '';
			display: block;
			width: 485upx;
			position: absolute;
			right: 30upx;
			bottom: 0;
			border-bottom: #E6E6E6 solid 1upx;
		}
		&:nth-last-of-type(1){
			&::after{
				content: '';
				display: none;
			}
		}
		.poster{
			width: 180upx;
			height: 180upx;
		}
		.shop_item{
			width: 240upx;
			height: 76upx;
			background: #F2F2F2;
			border-radius: 5upx;
			display: flex;
			align-items: center;
			.shop_item_poster{
				width: 76upx;
				height: 76upx;
				flex-shrink: 0;
			}
			.shop_item_info{
				margin-left: 14upx;
				flex-grow: 1;
				&>text{
					width: 140upx;
					display: block;
				}
			}
		}
		.case_detail{
			width: 490upx;
		}
		.fix_bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 98upx;
			background: #FFFFFF;
			box-shadow: 0px -1upx 11upx 0upx rgba(26, 25, 26, 0.2);
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon_close{
				width: 42upx;
				height: 42upx;
			}
			.btn{
				width: 170upx;
				height: 60upx;
				background: linear-gradient(90deg, #FFA846, #FF7686);
				border-radius: 8upx;
				font-size: 30upx;
				color: #fff;
				line-height: 60upx;
			}
		}
	}
</style>
