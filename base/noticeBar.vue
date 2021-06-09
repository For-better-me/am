<template>
	<view class="message_bar" v-if="text">
		<uni-notice-bar :scrollable='true' :showIcon='true' background-color='#FFE796' color="#0493FF" single="true" :text="text"></uni-notice-bar>
	</view>
</template>

<script>
	import CarpoolApi from '../apis/carpool.js'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default{
		name:'message_bar',
		props:['type'],
		components: {uniNoticeBar},
		data(){
			return{
				text:''
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				let data = {type:this.type}
				CarpoolApi.message(data).then(data=>{
					let list = []
					data.forEach(msg=>{
						list.push(msg.text)
					})
					this.text = list.join(';')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-noticebar{
	}
</style>
