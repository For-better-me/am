<template>
	<view>
		<filter-opts @filterList='listOpts'></filter-opts>
		<view class="list_wrap">
			<view class="case_style" v-for="item in list" :key='item.name'>
				<image src="../../static/img/banner.png" mode="aspectFill" class="poster"></image>
				<view class="case_detail">
					<view class="flex-center flex-lr">
						<text class="f-28 color-3 title_mini">{{item.name}}</text>
						<view class="label_style">{{item.major}}</view>
						<star :score="item.score"></star>
					</view>
					<view class="mar-t-30 flex-lr">
						<view class="">
							<view class="flex-center">
								<view class="flex-center">
									<image class="icon_case_order" src="../../static/img/icon_order.png"></image>
									<text class="f-20 color-3 mar-l-10">{{item.order_number}}单</text>
								</view>
								<view class="flex-center mar-l-30">
									<image class="icon_case_dun" src="../../static/img/icon_addr.png"></image>
									<text class="f-20 color-3 mar-l-10">{{item.distance}}km</text>
								</view>
							</view>
							<view class="flex-center mar-t-30">
								<image class="icon_case_shop" src="../../static/img/icon_shop2.png" mode=""></image>
								<text class="f-20 color-3 mar-l-10">{{item.merchant_title}}></text>
							</view>
						</view>
						<button type="default" v-if="item.is_subscribe == 10" class="btn_order">预约</button>
						<button type="default" v-if="item.is_subscribe == 20" class="btn_order disabled" disabled>未排班</button>
					</view>
					<view class="mar-t-30 f-20">
						本人与照片相似<text class="color-orange">{{item.similarity}}%</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import filterOpts from '@/base/filterOpts.vue'
	import star from '@/base/star.vue'
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	import listMixin from '@/utils/listMixin.js'
	export default {
		name: 'technician_pretty',
		components: {
			filterOpts,star
		},
		mixins:[listMixin],
		data() {
			return {
				listQuery:{
					lat:null,
					lng:null
				},
				http:ServiceApis.getPrettyTechnicianList,
			};
		},
		onLoad() {
			this.listQuery = Object.assign({},this.location)
			this.$nextTick(this.getList)
		},
		computed:{
			...mapGetters({
				'location':'getLocation'
			})
		},
		methods:{
			listOpts(opts){
				this.list = []
				this.listQuery = Object.assign({},this.listQuery,opts,{page:1})
				this.$nextTick(this.getList)
			}
		},
	}
</script>

<style lang="less">
	.list_wrap {
		margin-top: 120upx;
	}
</style>
