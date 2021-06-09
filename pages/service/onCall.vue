<template>
	<view class="oncall">
		<view class="oncall_type bg-fff">
			<view class="item" v-for="item in typeList" :key='item.title'>
				<image class='icon' :src="item.img"></image>
				<text class="f-24 color-3 align-c">{{item.title}}</text>
			</view>
			<!-- <view class="item">
				<image class='icon' src="../../static/img/oncall_foot.png"></image>
				<text class="f-24 color-3 align-c">足疗足浴</text>
			</view>
			<view class="item">
				<image class='icon' src="../../static/img/oncall_zy.png"></image>
				<text class="f-24 color-3 align-c">中医理疗</text>
			</view>
			<view class="item">
				<image class='icon' src="../../static/img/oncall_anno.png"></image>
				<text class="f-24 color-3 align-c">油压按摩</text>
			</view>
			<view class="item">
				<image class='icon' src="../../static/img/oncall_mr.png"></image>
				<text class="f-24 color-3 align-c">美容美体</text>
			</view> -->
		</view>
		<filter-opts @filterList='listOpts' :screenShow='false'></filter-opts>
		<view class="mar-t-20">
			<case-temp v-for="item in list" :project='item' :key='item.id' :isWrap='false'></case-temp>
		</view>
	</view>
</template>

<script>
	import filterOpts from '@/base/filterOpts.vue'
	import caseTemp from './component/caseTemp.vue'
	import listMixin from '@/utils/listMixin.js'
	import {mapGetters} from 'vuex'
	import ServiceApis from '@/apis/service.js'
	export default{
		name:'service_on_call',
		mixins:[listMixin],
		components:{filterOpts,caseTemp},
		data(){
			return{
				listQuery:{
					lat:null,
					lng:null,
					category_id:null
				},
				http:ServiceApis.onCallList,
				typeList:[]
			}
		},
		onLoad() {
			// this.listQuery = Object.assign({},this.location)
			this.getList()
			this.getTypeList()
		},
		methods:{
			getTypeList(){
				ServiceApis.onCallType().then(res=>{
					this.typeList = res.list
				})
			},
			listOpts(opts){
				this.list = [];
				this.listQuery = Object.assign({},this.listQuery,opts,{page:1})
				this.$nextTick(this.getList)
			}
		},
		computed:{
			...mapGetters({
				'location':'getLocation'
			})
		}
		
	}
</script>

<style lang="less" >
	.oncall_type{
		padding: 20upx 37upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item{
			.icon{
				width: 80upx;
				height: 80upx;
				display: block;
				margin-bottom: 10upx;
			}
		}
	}
	.filter_opts{
		width: 100%;
		height: 88upx;
		margin: 10upx 0;
		position: inherit !important;
		
	}

</style>
