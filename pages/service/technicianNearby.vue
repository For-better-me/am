<template>
	<view class="technician_nearby">
		<view class="">
			<technician-temp v-for="info in list" :key='info.name' :info='info'></technician-temp>
		</view>
	</view>
</template>

<script>
	import technicianTemp from '../technician/component/technicianTemp.vue'
	import listMixin from '@/utils/listMixin.js'
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	export default{
		name:'technician_nearby',
		components:{technicianTemp},
		mixins:[listMixin],
		data(){
			return{
				listQuery:{
					lat:null,
					lng:null
				},
				http:ServiceApis.getNearbyTechnicianList
			}
		},
		onLoad() {
			this.listQuery = Object.assign({},this.location)
			this.getList()
		},
		computed:{
			...mapGetters({
				'location':'getLocation'
			})
		}
	}
</script>

<style lang="less" scoped>
</style>
