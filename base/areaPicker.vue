<template>
	<view class="picker_wrap">
		<view class="mask" @click="cancel"></view>
		<view class="pad-lr-30 flex-lr btn_view">
			<text class="f-28 bold color-6" @click="cancel">取消</text>
			<text class="f-28 bold color-theme" @click="sure">确定</text>
		</view>
		<picker-view :value='value' :indicator-style="indicatorStyle" @change="bindChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for='el in list_1' :key='el.id'>{{el.name}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in list_2' :key='el.id'>{{el.name}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in list_3' :key='el.id'>{{el.name}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in list_4' :key='el.id'>{{el.name}}</view>
			</picker-view-column>
			<!-- <picker-view-column>
				<view class="item" v-for='el in list_5' :key='el.id'>{{el.name}}</view>
			</picker-view-column> -->
		</picker-view>
	</view>
</template>

<script>
	import CarpoolApi from '../apis/carpool.js'
	export default {
		name: 'area_picker',
		props: {
			valueArea: {
				type: Array,
				default: () => {
					return [0, 0, 0, 0]
				}
			},
			type: {
				type: Number,
				required:false,
				default:1//1--发布；2--拼车
			},
			orderId:{
				type: [Number,String],
				required:false,
			}
		},
		data() {
			return {
				indicatorStyle: `height: 50rpx;`,
				list_1: [],
				areaList: [],
				value: [0, 0, 0, 0]
				// list_3: [],
				// list_4: [],
				// list_5: [],
			}
		},
		computed: {
			list_2() {
				if (this.areaList.length == 0) {
					return []
				}
				let [i, j, k, q] = this.value
				return this.mapFun(this.areaList[i].children)
			},
			list_3() {
				if (this.areaList.length == 0) {
					return []
				}
				let [i, j, k, q] = this.value
				return this.mapFun(this.areaList[i].children[j].children)
			},
			list_4() {
				if (this.areaList.length == 0) {
					return []
				}
				let [i, j, k, q] = this.value
				return this.mapFun(this.areaList[i].children[j].children[k].children)
			}
		},
		watch: {
			valueArea(n, o) {
				console.log(n)
				this.value = n
			}
		},
		mounted() {
			this.value = this.valueArea
			this.getAddr()
		},
		methods: {
			bindChange(e) {
				this.value = e.detail.value
			},
			cancel() {
				this.$emit('showChange', 'CANCEL')
			},
			sure() {
				let [i, j, k, q] = this.value
				let item = this.areaList[i].children[j].children[k].children[q]
				let fullname = this.areaList[i].name + '/' + this.areaList[i].children[j].name + '/' + this.areaList[i].children[j]
					.children[k]
					.name + '/' + item.name
				this.$emit('showChange', 'SURE', this.value, item.id, item.name, fullname)
			},
			getAddr() {
				if(this.type == 1){
					CarpoolApi.searchOption().then((res) => {
						let data = res.city
						this.areaList = data
						this.list_1 = this.mapFun(data)
					})
				}else{
					CarpoolApi.carpoolOption({id:this.orderId}).then((res) => {
						let data = res.city
						this.areaList = data
						this.list_1 = this.mapFun(data)
					})
				}
				
			},
			mapFun(data) {
				let list = data.map(el => {
					let item = {
						id: el.id,
						name: el.name
					}
					return item
				})
				return list;
			}
		}
	}
</script>

<style lang="less" scoped>
	.picker_wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 9999;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 500rpx);
		z-index: 99;
		background: rgba(0, 0, 0, 0.5);
	}

	.btn_view {
		left: 0;
		bottom: 500rpx;
		height: 80upx;
		line-height: 80rpx;
		z-index: 9999;
		background: #f2f2f2;
		position: absolute;
		border-bottom: #E6E6E6 solid 1rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.picker-view {
		width: 100%;
		height: 500rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9999;
		background: #fff;
	}

	.item {
		height: 50rpx;
		line-height: 68rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 28rpx;
		// color: #333;
	}
</style>
