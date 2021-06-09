<template>
	<view class="filter_opts">
		<view class="flex-center opts">
			<view class="opt_name" @click="type=1" :class="listQuery.merchant_id?'active':''">
				<text class="text">服务商</text>
				<view class="stri"></view>
			</view>
			<view class="opt_name" @click="type=2" :class="listQuery.screen?'active':''" v-if="screenShow">
				<text class="text">筛选</text>
				<view class="stri"></view>
			</view>
			<view class="opt_name" @click="type=3" :class="listQuery.order?'active':''">
				<text class="text">排序</text>
				<view class="stri"></view>
			</view>
		</view>
		<view class="store opts_wrap flex-center" v-show="type==1">
			<view class="store_item" :class="listQuery.merchant_id == shop.id?'on':''" v-for="shop in shopList" :key='shop.title' @click="sureOpts('merchant_id',shop.id)">
				<image src="../static/img/icon_shop2.png" class="icon_shop mar-r-10"></image>
				<text class="f-20 color-3">{{shop.title}}</text>
			</view>
		</view>
		<view class="screen opts_wrap" v-show="type==2">
			<view class="opt_item pad-20 border_bottom" v-for="item in screenOpts" :key='item.name' @click="sureOpts('screen',item.id)">
				<view class="f-26 color-3" :class="item.id==listQuery.screen?'on':''">{{item.name}}</view>
			</view>
		</view>
		<view class="order opts_wrap" v-show="type==3">
			<view class="opt_item pad-20 border_bottom" v-for="item in sortOpts" :key='item.name' @click="sureOpts('order',item.id)">
				<view class="f-26 color-3" :class="item.id==listQuery.order?'on':''">{{item.name}}</view>
			</view>
		</view>
		<view class="black_wrap" v-if="type!==0" @click="type=0"></view>
	</view>
</template>

<script>
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'filter_opts',
		props:{
			screenShow:{
				type:Boolean,
				required:false,
				default:true
			}
		},
		data(){
			return{
				type:0,
				listQuery:{
					merchant_id:null,
					screen:null,
					order:null
				},
				shopList:[],
				// 10资质认证，20头像认证，30实名认证
				screenOpts:[
					{
						id:10,
						name:'资质认证'
					},
					{
						id:20,
						name:'头像认证'
					},
					{
						id:30,
						name:'实名认证'
					}
				],
				// 10系统推荐，20销量最高，30距离最近，40最新加入
				sortOpts:[
					{
						id:10,
						name:'系统推荐'
					},
					{
						id:20,
						name:'销量最高'
					},
					{
						id:30,
						name:'距离最近'
					},
					{
						id:40,
						name:'最新加入'
					}
				]
			}
		},
		mounted(){
			this.getServices()
		},
		methods:{
			getServices(){
				ShopApis.getShopList().then(res=>{
					this.shopList=res.list
				})
			},
			sureOpts(key,id){
				this.type=0
				this.listQuery[key] = id
				this.$emit('filterList',this.listQuery)
			}
		}
	}
</script>

<style lang="less" scoped>
	.filter_opts{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
	}
	.store{
		flex-wrap: wrap;
	}
	.opts_wrap{
		padding: 20upx;
		background: #fff;
		position: relative;
		z-index: 100;
		
		.store_item{
			width: 225upx;
			height: 50upx;
			border-radius: 4upx;
			background: #eee;
			margin: 6upx;
			justify-content: center;
			display: flex;
			align-items: center;
			flex-shrink: 0;
			&.on{
				background: #FF4F19;
				text{
					color: #fff;
				}
			}
		}
		.on{
			color: #FF4F19;
		}
	}
	.opts{
		padding: 30upx 0;
		background: #fff;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 100;
		.opt_name{
			display: flex;
			height: 100%;
			align-items: center;
			justify-content: center;
			flex-grow: 1;
			&.active{
				.text{
					color: #FF4F19;
				}
				.stri{
					border-top: #FF4F19 solid 10upx;
				}
			}
		}
		.text{
			font-size: 30upx;
			color: #646464;
			margin-right: 10upx;
		}
		.stri{
			width: 0;
			height: 0;
			border-top: #969696 solid 10upx;
			border-bottom: transparent solid 10upx;
			border-left: transparent solid 10upx;
			border-right: transparent solid 10upx;
			margin-top: 15upx;
		}
	}
</style>
