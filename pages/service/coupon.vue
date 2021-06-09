<template>
	<view class="pad-20-30 bg-fff coupon">
		<view class="coupon_item mar-b-20" v-for="coupon in list" :key='coupon.title'>
			<image src="../../static/img/bg_coupon.png" class="bg" mode=""></image>
			<view class="flex-center coupon_info">
				<view class="flex-center" @click="info(coupon.id)">
					<view class="price"><text class="f-36">￥</text>{{coupon.avoid_price}}</view>
					<view class="con">
						<view class="color-1 f-30 ellipsis">{{coupon.title}}</view>
						<view class="color-6 f-20 mar-t-7">上门使用</view>
						<view class="color-6 f-20 mar-t-10">{{coupon.threshold_price==0?'无门槛':`服务费用满${coupon.threshold_price}元可用`}}</view>
					</view>
				</view>
				<button type="default" class="btn_get" @click="add(coupon.id)">立即获取</button>
			</view>
		</view>
		<no-data v-if="list.length==0" tip='暂无可领优惠券'></no-data>
	</view>
</template>

<script>
	import CouponApis from '@/apis/coupon.js'
	import noData from '@/base/nodata.vue'
	export default{
		name:'coupon',
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				CouponApis.list().then(res=>{
					this.list = res.list
				})
			},
			add(id){
				CouponApis.add({id}).then(res=>{
					this.$util.showToast('领取成功','success')
					// this.getList()
				})
			},
			info(id){
				uni.navigateTo({
					url:'/pages/service/couponInfo?id='+id
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	
</style>
