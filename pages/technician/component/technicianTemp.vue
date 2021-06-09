<template>
	<view class="case_style">
		<image :src="poster" mode="aspectFill" class="poster" @click="$util.goTechnicianPage(info.id)"></image>
		<view class="case_detail">
			<view class="flex-center flex-lr">
				<text class="f-28 color-3 title_mini">{{info.name}}</text>
				<view class="label_style">{{info.major}}</view>
				<star :score="info.score"></star>
			</view>
			<view class="flex-center mar-t-15">
				<view class="flex-center">
					<image class="icon_case_phone" src="/static/img/icon_phone.png" ></image>
					<text class="f-20 color-orange mar-l-10">手机认证</text>
				</view>
				<view class="flex-center mar-l-30">
					<image class="icon_case_dun" src="/static/img/icon_dun.png" ></image>
					<text class="f-20 color-3 mar-l-10">实名认证</text>
				</view>
				<view class="flex-center mar-l-30">
					<image class="icon_case_dun" src="/static/img/icon_avatar.png" ></image>
					<text class="f-20 color-3 mar-l-10">头像认证</text>
				</view>
			</view>
			<view class="mar-t-20 flex-lr">
				<view class="">
					<view class="flex-center">
						<view class="flex-center">
							<image class="icon_case_order" src="/static/img/icon_order.png" ></image>
							<text class="f-20 color-3 mar-l-10">{{info.order_number}}单</text>
						</view>
						<view class="flex-center mar-l-30">
							<image class="icon_case_dun" src="/static/img/icon_addr.png" ></image>
							<text class="f-20 color-3 mar-l-10">{{info.distance}}km</text>
						</view>
					</view>
					<view class="flex-center mar-t-15" @click="$util.goShopPage(info.merchant_id)">
						<image class="icon_case_shop" src="/static/img/icon_shop2.png" mode=""></image>
						<text class="f-20 color-3 mar-l-10">{{info.merchant_title}}></text>
					</view>
				</view>
				<button type="default"class="btn_order" v-if="info.is_subscribe==10">可预约</button>
				<button type="default"class="btn_order disabled" disabled v-if="info.is_subscribe==20">未排版</button>
			</view>
			
			<view class="mar-t-20" v-if="isShowLabel">
				<view class="case_item" v-for="name in info.label" :key='name'>{{name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import star from '@/base/star.vue'
	export default{
		name:'technician_temp',
		props:{
			info:{
				required:true,
				type:Object,
			},
			isShowLabel:{
				required:false,
				type:Boolean,
				default:true
			}
		},
		components:{star},
		computed:{
			poster(){
				if(this.info.images && this.info.images.length>0){
					return this.info.images[0]
				}
				return null
			}
		}
	}
</script>

<style>
</style>
