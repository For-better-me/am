<template>
	<view class="shop_home">
		<view class="recommend_js">
			<view class="flex-lr">
				<text class="f-28 color-1 bold">推荐技师</text>
				<text class="f-26 color-6" @click="lookTotal">查看全部 ></text>
			</view>
			<view class="js_list mar-t-20">
				<view class="align-c js_item"v-for="man in artificerList" :key='man.id'>
					<image @click="$util.goTechnicianPage(man.id)" class="js_pic" :src="man.images&& man.images[0]" mode="aspectFill"></image>
					<view class="f-22 color-6 mar-t-7 ellipsis">{{man.name}}</view>
				</view>
			</view>
		</view>
		<view class="recommend_case mar-t-20 bg-fff">
			<view class="title_style bold">推荐项目</view>
			<view class="">
				<case-temp v-for="item in projectList" :project='item' :key='item.id'></case-temp>
			</view>
		</view>
	</view>
</template>

<script>
	import caseTemp from './caseTemp.vue'
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'shop_home',
		components:{caseTemp},
		props:['merchant_id'],
		mounted() {
			this.list()
		},
		data(){
			return{
				artificerList:[],
				projectList:[],
			}
		},
		methods:{
			list(){
				let data = {
					merchant_id:this.merchant_id
				}
				ShopApis.infoRecommend(data).then(res=>{
					this.artificerList = res.artificer_list
					this.projectList = res.project_list
				})
			},
			lookTotal(){
				this.$emit('all')
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop_home{
		.recommend_js{
			padding: 20upx 30upx;
			background: #fff;
			font-size: 0;
			.js_item{
				width: 130upx;
				display: inline-block;
				vertical-align: top;
				margin-right: 10upx;
				&:nth-last-of-type(1){
					margin-right: 0;
				}
				.js_pic{
					width: 130upx;
					height: 130upx;
					border-radius: 6upx;
				}
			}
		}
		
		.recommend_case{
			.title_style{
				padding: 20upx 30upx;
				font-size: 28upx;
				color: #1a1a1a;
				border-bottom: #EBEBEB solid 1upx;
			}
			
		}
	}
</style>
