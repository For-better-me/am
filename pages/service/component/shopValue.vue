<template>
	<view class="shop_value">
		<view class="value_type flex-lr">
			<text class='f-28 color-orange' @click="currentType=1">全部 ({{total}})</text>
			<text class='f-28 color-6' @click="currentType=2">好评 ({{praise_number}})</text>
			<text class='f-28 color-6' @click="currentType=3">中评 ({{praise_number}})</text>
			<text class='f-28 color-6' @click="currentType=4">差评 ({{difference_number}})</text>
		</view>
		<view class="value_list">
			<view class="shop_value_item bg-fff mar-b-10" v-for="item in list" :key='item.id'>
				<view class="pad-20-30 ">
					<view class="flex-lr">
						<view class="flex-center">
							<image :src="item.avatar" mode="aspectFill" class="avatar"></image>
							<view class="mar-l-20">
								<text class="f-30 color-1">{{item.is_anonymous==2?'匿名用户':item.nickname}}</text>
								<view class="flex-center mar-t-15" v-if="item.level==10">
									<text class="f-22 color-6">好评</text>
									<image src="../../../static/img/icon_fa.png" class="icon_fa mar-l-10"></image>
								</view>
								<view class="flex-center mar-t-15" v-else-if="item.level==20">
									<text class="f-22 color-6">中评</text>
									<image src="../../../static/img/icon_fa.png" class="icon_fa mar-l-10"></image>
								</view>
								<view class="flex-center mar-t-15" v-else-if="item.level==30">
									<text class="f-22 color-6">差评</text>
									<image src="../../../static/img/icon_fa.png" class="icon_fa mar-l-10"></image>
								</view>
							</view>
						</view>
						<view class="f-22 color-9 mar-t-7">{{item.create_time}}</view>
					</view>
					<view class="f-24 color-1 mar-t-30">{{item.text || '这个客人很懒，没有发表评价，系统默认五星好评'}}</view>
				</view>
				<view class="flex-lr pad-20-30 border_top mar-t-20">
					<text class="color-6 f-22">真实描述：{{item.project_score}}星</text>
					<text class="color-6 f-22">服务技能：{{item.artificer_score}}星</text>
					<text class="color-6 f-22">服务态度：{{item.merchant_score}}星</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'shop_value',
		data(){
			return{
				total:0,
				praise_number:0,
				difference_number:0,
				pertinent_number:0,
				allList:[],
				praiseList:[],
				differenceList:[],
				pertinentList:[],
				currentType:1,
			}
		},
		props:['merchant_id'],
		mounted() {
			this.getValueList()
		},
		computed:{
			list(){
				switch (this.currentType){
					case 1:
						return this.allList
					case 2:
						return this.praiseList
					case 3:
						return this.pertinentList
					case 4:
						return this.differenceList
					default:
						return []
						break;
				}
			}
		},
		methods:{
			getValueList(){
				let data = {
					merchant_id:this.merchant_id,
					type:1
				}
				ShopApis.infoComment(data).then(res=>{
					this.allList = res.list
					this.praiseList = res.list.filter(el=>el.level == 10)
					this.pertinentList = res.list.filter(el=>el.level == 20)
					this.differenceList = res.list.filter(el=>el.level == 30)
					this.praise_number = res.praise_number
					this.pertinent_number = res.pertinent_number
					this.difference_number = res.difference_number
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.value_type{
		padding: 30upx;
		background: #FFFFFF;
		border-radius: 20px 20px 0px 0px;
		border-bottom: #EBEBEB solid 1upx;
	}
	.shop_value{
		.avatar{
			width: 100upx;
			height: 100upx;
			border-radius: 40upx;
		}
		.shop_value_item{
		}
	}
</style>
