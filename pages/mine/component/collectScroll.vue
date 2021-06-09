<template>
	<view class="collect_scroll">
		<scroll-view scroll-y="true" class="collect_scroll">
			<view class="collect_item" v-for="item in list" :key='item.id'>
				<image src="../../../static/img/banner.png" mode="aspectFill" class="img"></image>
				<view class="flex-lr flex-center pad-20">
					<text class="f-24 color-1" v-if="type==0">{{item.name}}</text>
					<text class="f-24 color-1" v-else-if="type==1">{{item.merchant_title}}</text>
					<view class="flex-center" v-if="type==0">
						<image src="../../../static/img/icon_shop.png" class="icon_shop"></image>
						<view class="mar-l-4 f-20 color-1">{{item.merchant_title}}</view>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import MyApis from '@/apis/my.js'
	export default{
		name:'collect_scroll',
		props:['type'],
		data(){
			return{
				list:[]
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			getList(){
				MyApis.getCollectionList(this.type).then(res=>{
					this.list = res.list
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.collect_scroll{
		height: calc(100vh - 140upx);
		overflow: hidden;
		.collect_item{
			width: 350upx;
			border-radius: 10upx;
			background: #fff;
			margin-bottom: 13upx;
			float: left;
			overflow: hidden;
			&:nth-last-of-type(odd){
				margin-right: 11upx;
			}
			.img{
				width: 100%;
				height: 275upx;
			}
		}
	}
</style>
