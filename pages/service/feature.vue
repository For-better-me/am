<template>
	<view class="feature">
		<view class="">
			<technician-temp v-for="info in list" :key='info.name' :info='info'></technician-temp>
		</view>
	</view>
</template>

<script>
	import technicianTemp from '../technician/component/technicianTemp.vue'
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	import listMixin from '@/utils/listMixin.js'
	export default{
		name:'feature',
		components: {
			technicianTemp
		},
		mixins:[listMixin],
		data() {
			return {
				listQuery:{
					lat:null,
					lng:null
				},
				http:ServiceApis.getFeature,
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
	}
</script>

<style>
</style>
