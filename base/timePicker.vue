<template>
	<view class="picker_wrap">
		<view class="mask" @click="cancel"></view>
		<view class="pad-lr-30 flex-lr btn_view">
			<text class="f-28 color-6 bold" @click="cancel">取消</text>
			<text class="f-28 color-theme bold" @click="sure">确定</text>
		</view>
		<picker-view :value='value' :indicator-style="indicatorStyle" @change="bindChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for='el in yearList' :key='el'>{{el}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in monthList' :key='el'>{{el}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in dateList' :key='el'>{{el}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in hourList' :key='el'>{{el}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for='el in secondList' :key='el'>{{el}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	import CarpoolApi from '../apis/carpool.js'
	export default {
		name: 'time_picker',
		props: {
			valueTime: {
				type: Array
			}
		},
		data() {
			return {
				indicatorStyle: `height: 50rpx;`,
				yearList: [],
				monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				dateList: [],
				hourList: [],
				secondList: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
				value: [10, 0, 0, 0,0]
				// list_3: [],
				// list_4: [],
				// list_5: [],
			}
		},
		watch: {
			valueTime(n, o) {
				if(n.length>0){
					this.value = n
				}else{
					this.value = this.initValue()
				}
			}
		},
		mounted() {
			this.initDate(this.value)
			this.initTime()
			this.$nextTick(()=>{
				if(this.valueTime.length>0){
					this.value = this.valueTime
				}else{
					this.value = this.initValue()
				}
				console.log(this.value)
			})
			
		},
		methods: {
			bindChange(e) {
				this.value = e.detail.value
				this.initDate(e.detail.value)
				
			},
			cancel() {
				this.$emit('showChange', 'CANCEL')
			},
			sure() {
				let [i, j, k,p,q] = this.value
				let time = `${this.yearList[i]}-${this.monthList[j]}-${this.dateList[k]} ${this.hourList[p]}:${this.secondList[q]}`
				this.$emit('showChange', 'SURE', this.value, time)
			},
			initValue(){
				let mon = new Date().getMonth()
				let day = new Date().getDate()-1
				let hour = new Date().getHours()
				return [10, mon, day, hour,0]
			},
			initDate(value){
				let [i,j,k,p,q] = value
				let year = this.yearList[i]
				let month = Number(this.monthList[j])
				let days = 0
				let month_31 = [1,3,5,7,8,10,12]
				let month_30 = [4,6,9,11]
				let list = []
				if(year%4==0 && month==2){
					days = 28
				}
				if(year%4!=0 && month==2){
					days = 29
				}
				if(month_30.indexOf(month)>-1){
					days = 30
				}
				if(month_31.indexOf(month)>-1){
					days = 31
				}
				for(let i=1;i<=days;i++){
					list.push(this.$util.formatNum(i))
				}
				this.dateList = list
			},
			initTime() {
				let list_hour = []
				let list_year = []
				let year = new Date().getFullYear()
				for (let i = 0; i < 24; i++) {
					list_hour.push(this.$util.formatNum(i));
				}
				for (let i = year - 10; i < year + 20; i++) {
					list_year.push(i);
				}
				this.hourList = list_hour
				this.yearList = list_year
			},
			getDate() {
				CarpoolApi.searchOption().then((res) => {
					this.dateList = res.date
				})
			},

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
