<template>
	<view class="case_style mar-b-10">
		<image :src="project.img" mode="aspectFill" class="poster"></image>
		<view class="case_detail">
			<view class="flex-center flex-lr">
				<text class="f-28 color-3 title">{{project.title}}</text>
				<star :score="project.score"></star>
			</view>
			<view class="flex-center mar-t-15" v-if="isWrap">
				<view class="flex-center">
					<image class="icon_case_order" src="/static/img/icon_money.png" ></image>
					<text class="f-20 color-orange mar-l-10">{{project.price}}元/次</text>
				</view>
				<view class="flex-center mar-l-100">
					<image class="icon_case_order" src="/static/img/icon_order.png" ></image>
					<text class="f-20 color-3 mar-l-10">{{project.order_number}}单</text>
				</view>
			</view>
			<view class="flex-center mar-t-15" v-if="isWrap">
				<image class="icon_case_order" src="/static/img/icon_time2.png" ></image>
				<text class="f-20 color-3 mar-l-10">{{project.duration}}分钟</text>
			</view>
			<view class="flex-center mar-t-15" v-if="!isWrap">
				<view class="flex-center">
					<image class="icon_case_order" src="/static/img/icon_money.png" ></image>
					<text class="f-20 color-orange mar-l-10">{{project.price}}元/次</text>
				</view>
				<view class="flex-center mar-l-30">
					<image class="icon_case_order" src="/static/img/icon_order.png" ></image>
					<text class="f-20 color-3 mar-l-10">{{project.order_number}}单</text>
				</view>
				<view class="flex-center mar-l-30">
					<image class="icon_case_order" src="/static/img/icon_time2.png" ></image>
					<text class="f-20 color-3 mar-l-10">{{project.duration}}分钟</text>
				</view>
			</view>
			<view class="flex-center mar-t-15" @click="$util.goShopPage(project.merchant_id)" v-if="!isWrap">
				<image class="icon_case_shop" src="/static/img/icon_shop2.png" mode=""></image>
				<text class="f-20 color-3 mar-l-10">{{project.merchant_title}}></text>
			</view>
			<view class="mar-t-15">
				<view class="case_item" v-for="el in project.position" :key='el'>{{el}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import star from '@/base/star.vue'
	export default{
		name:'case_temp',
		components:{star},
		props:{
			project:{
				type:Object,
				required:true
			},
			isWrap:{
				type:Boolean,
				required:false,
				default:true
			}
		}
	}
</script>

<style>
</style>
