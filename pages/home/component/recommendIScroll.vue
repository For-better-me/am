<template>
	<scroll-view scroll-y="true" class="scroll_h"  @scrolltolower='getMore'>
		<view class="technician" v-for="info in list" :key='info.img'>
			<image class="img" :src="info.img" mode="aspectFill" @click="$util.goTechnicianPage(info.id)"></image>
			<view class="info flex-lr">
				<view class="">
					<text class="f-24 color-1">{{info.name}}</text>
					<view class="flex-center" @click="$util.goShopPage(info.merchant_id)">
						<image class="icon_shop" src="../../../static/img/icon_shop.png"></image>
						<text class="f-22 color-1 mar-l-4">{{info.title}}</text>
					</view>
				</view>
				<view class="flex-r">
					<image class="icon_good" src="../../../static/img/icon_good.png" mode=""></image>
					<text class="f-22 color-9" v-if="info.distance_status==1">距离较远</text>
				</view>
			</view>
		</view>
	</scroll-view>

</template>

<script>
	import OtherApi from '../../../apis/other.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'homeRecommendScroll',
		props: ['type'],
		data() {
			return {
				list: [],
				listQuery: {
					page: 1,
					limit: 10
				},
				total: 0
			}
		},
		mounted() {
			this.getList()
		},
		computed: {
			...mapGetters({
				'location': 'getLocation'
			})
		},
		methods: {
			getList() {
				let data = {
					type: this.type,
					...this.location,
					...this.listQuery
				}
				OtherApi.homeRecommend(data).then(res => {
					this.list = this.list.concat(res.list)
					this.total = res.total_page
				})
			},
			getMore(type) {
				this.listQuery.page++
				this.$nextTick(() => {
					if (this.listQuery.page <= total) {
						this.getRecommendList()
					} else {
						this.$util.showToast('没有更多了~')
					}
				})

			}

		}
	}
</script>

<style lang="less" scoped>
	.scroll_h {
		max-height: 1150upx;
	}

	.technician {
		width: 350upx;
		min-height: 450upx;
		border-radius: 10upx;
		margin-bottom: 10upx;
		background: #FFFFFF;
		overflow: hidden;
		display: inline-block;
		vertical-align: top;
		font-size: 0;

		&:nth-of-type(odd) {
			margin-right: 10upx;
		}

		.img {
			width: 350upx;
			height: 365upx;
			border-radius: 10upx;
			overflow: hidden;
		}

		.info {
			padding: 15upx;

			.icon_good {
				margin-bottom: 10upx;
			}
		}
	}
</style>
