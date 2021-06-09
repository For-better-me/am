<template>
	<view class="shop_case">
		<case-temp v-for="item in list" :project='item' :key='item.id'></case-temp>
	</view>
</template>

<script>
	import caseTemp from './caseTemp.vue'
	import ShopApis from '@/apis/shop.js'
	export default{
		name:'shop_case',
		components:{caseTemp},
		props:['merchant_id'],
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
				let data = {
					merchant_id:this.merchant_id
				}
				ShopApis.infoProject(data).then(res=>{
					this.list = res
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>
