<template>
	<view class="about pad-30">
		<rich-text :nodes="info"></rich-text>
	</view>
</template>

<script>
	import MyApi from '../../apis/my.js'
	export default{
		name:'about',
		data(){
			return{
				info:''
			}
		},
		onLoad() {
			this.init()
		},
		methods:{
			init(){
				MyApi.about().then(data=>{
					this.info = data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.about{
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
	}
</style>
