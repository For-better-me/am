<template>
	<view class="flex-center">
		<image class="icon_star" src="@/static/img/icon_star.png" v-for="n in score"></image>
		<image class="icon_star" src="@/static/img/icon_star_white.png" v-for="n in (5-score)"></image>
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
			}
		}
	}
</script>

<style>
</style>
