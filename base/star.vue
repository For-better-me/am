<template>
	<view class="flex-center">
		<image class="icon_star" src="@/static/img/icon_star.png" v-for="n in score" @click="set(n)"></image>
		<image class="icon_star" src="@/static/img/icon_star_white.png" v-for="n in (5-score)" @click="set(5-n)"></image>
	</view>
</template>

<script>
	export default{
		name:'star',
		props:{
			score:{
				type:[String,Number],
				default:0,
				required:true
			},
			desc:{
				type:String,
				default:'',
				required:false
			}
		},
		methods:{
			set(n){
				if(this.desc){
					this.$emit('setScore',this.desc,n)
				}
			}
		}
	}
</script>

<style>
</style>
