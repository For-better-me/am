<template>
	<view>
		<filter-opts @filterList='listOpts'></filter-opts>
		<view class="list_wrap mar-t-120">
			<technician-temp :info='item' v-for="item in list" :key='item.name'></technician-temp>
	   </view>
	</view>
</template>

<script>
	import filterOpts from '@/base/filterOpts.vue'
	import technicianTemp from './component/technicianTemp.vue'
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	import listMixin from '@/utils/listMixin.js'
	export default{
		name:'technician_list',
		mixins:[listMixin],
		components:{technicianTemp,filterOpts},
		data(){
			return{
				listQuery:{
					lat:null,
					lng:null
				},
				http:ServiceApis.getAllTechnicianList,
			}
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
		methods:{
			listOpts(opts){
				this.list = [];
				this.listQuery = Object.assign({},this.listQuery,opts,{page:1})
				this.$nextTick(this.getList)
			}
		},
	}
</script>

<style>
</style>
