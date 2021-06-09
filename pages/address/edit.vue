<template>
	<view class="addr_edit pad-lr-30 ">
		<view class="bg-fff">
			<view class="flex-center border_bottom pad-tb-30">
				<text class="item">联系人</text>
				<input type="text" v-model="addrInfo.name" placeholder="请填写姓名" />
			</view>
			<view class="flex-center border_bottom pad-tb-30">
				<text class="item">联系电话</text>
				<input type="number" v-model="addrInfo.phone" placeholder="请填写联系电话" />
			</view>
			<view class="flex-center border_bottom pad-tb-30" @click="chooseAddr">
				<text class="item">服务地址</text>
				<input type="text" :value="addrInfo.address" disabled placeholder="请选择服务地址" />
			</view>
			<view class="flex-center border_bottom pad-tb-30">
				<text class="item">门牌号</text>
				<input type="text" v-model="addrInfo.house_number" placeholder="例：6栋三单元501" />
			</view>
			<view class="flex-center flex-lr pad-tb-30">
				<text class="f-30 color-3">设为默认地址</text>
				<switch :checked="addrInfo.is_default==2" color='#04BE02' @change="updateDefault" size='mini'/>
			</view>
		</view>
		<button class="btn_style btn_save" @click="save">保 存</button>
	</view>
</template>

<script>
	import AddrApis from '@/apis/addr.js'
	export default{
		name:'update_addr',
		data(){
			return{
				addrInfo:{
					name:null,
					phone:null,
					address:null,
					house_number:null,
					lat:null,
					lng:null,
					is_default:2,
					city_name:'天津'
				},
			}
		},
		onLoad(opt) {
			if(opt.id){
				this.getInfo()
				uni.setNavigationBarTitle({
					title:'编辑地址'
				})
			}
		},
		methods:{
			getInfo(id){
				AddrApis.info({data}).then(res=>{
					this.addrInfo = Object.assign({},this.addrInfo,res.data)
				})
			},
			updateDefault(e){
				this.addrInfo.is_default = e.detail.value?2:1
			},
			chooseAddr(){
				uni.chooseLocation({
					success: (({name,address,latitude,longitude})=>{
						this.addrInfo.address = name
						this.addrInfo.lat = latitude
						this.addrInfo.lng = longitude
					})
				})
			},
			save(){
				let data = this.addrInfo
				if(data.name && data.phone && data.address && data.house_number){
					if(data.id){
						AddrApis.update()(data).then(res=>{
							uni.showToast({
								title:'更新成功'
							})
							uni.navigateBack()
						})
					}else{
						AddrApis.add(data).then(res=>{
							uni.showToast({
								title:'新增成功'
							})
							uni.navigateBack()
						})
					}
				}else{
					this.$util.showToast('请完善信息')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.addr_edit{
		font-size: 30upx;
		.item{
			font-size: 30upx;
			color: #333;
			width: 6em;
		}
		.btn_save{
			margin: 0 auto;
			margin-top: 120upx;
		}
	}
	
	
</style>
