<template>
	<view class="my_addr">
		<no-data v-if="list.length==0" tip='暂无服务地址' :img='noDataImg'></no-data>
		<view class="addr_list">
			<view class="addr pad-20" v-for="addr in list" :key='addr.id'>
				<view class="pad-20">
					<view class="flex-lr flex-center color-3">
						<text class="f-30">收货人：{{addr.name}}</text>
						<text class="f-28">{{addr.phone}}</text>
					</view>
					<view class="f-26 color-9 mar-t-20">{{addr.address}} {{addr.house_number}}</view>
				</view>
				<view class="flex-center flex-lr pad-20 border_top">
					<view class="flex-center" v-if="addr.is_default==2">
						<image src="../../static/img/icon_checked.png" class="icon_check"></image>
						<text class="f-24 color-orange mar-l-20">默认地址</text>
					</view>
					<view class="flex-center" v-if="addr.is_default==1" @click="set(addr.id)">
						<image src="../../static/img/icon_uncheck2.png" class="icon_check"></image>
						<text class="f-24 color-orange mar-l-20">设为默认地址</text>
					</view>
					<view class="flex-center">
						<view class="flex-center" @click="updateAddr(2,addr.id)">
							<image src="../../static/img/icon_edit_addr.png" class="icon_check"></image>
							<text class="f-24 color-3 mar-l-20">编辑</text>
						</view>
						<view class="flex-center mar-l-30" @click="delComfirm(addr.id)">
							<image src="../../static/img/icon_del_addr.png" class="icon_check"></image>
							<text class="f-24 color-3 mar-l-20">删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button type="default" class="new_btn btn_style" @click="updateAddr(1)">+新建地址</button>
	</view>
</template>

<script>
	import noData from '@/base/nodata.vue'
	import AddrApis from '@/apis/addr.js'
	import listMixin from '@/utils/listMixin.js'
	export default {
		name: 'my_addr',
		components: {
			noData
		},
		mixins:[listMixin],
		data() {
			return {
				listQuery: {},
				noDataImg: require('../../static/img/no_addr.png'),
				http:AddrApis.list
			}
		},
		onShow() {
			this.getList()
		},
		methods:{
			updateAddr(type,id){
				let url = type==1?'/pages/address/edit':'/pages/address/edit?id='+id
				uni.navigateTo({
					url
				})
			},
			delComfirm(id){
				uni.showModal({
					title:'温馨提示',
					content:'确定要删除该地址吗？',
					success: (res) => {
						if(res.confirm){
							this.del(id)
						}
					}
					
				})
			},
			del(id){
				AddrApis.del({id}).then(res=>{
					uni.showToast({
						title:'已删除'
					})
				})
			},
			set(id){
				AddrApis.setDefault({id}).then(res=>{
					this.list = this.list.map(item=>{
						if(item.id == id){
							item.is_default =2
						}else{
							item.is_default =1
						}
						return item
					})
					uni.showToast({
						title:'设置成功'
					})
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.my_addr {
		.addr_list{
			padding-bottom: 180upx;
		}
		.new_btn {
			position: fixed;
			left: 30upx;
			bottom: 60upx;
			z-index: 66;
			letter-spacing: 2upx;
		}

		.addr {
			width: 720upx;
			background: #FFFFFF;
			box-shadow: 0upx 1upx 19upx 0upx rgba(0, 0, 0, 0.09);
			border-radius: 9upx;
			box-sizing: border-box;
			margin: 25upx auto;
		}
	}
</style>
