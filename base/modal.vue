<template>
	<view class="black_wrap">
		<view class="modal_con">
			<text class="color-1 f-36 block align-c">{{title}}</text>
			<text class="color-9 f-24 block align-c mar-t-15" v-if="tip">{{tip}}</text>
			<input v-if="isInput && typeInput=='input'" class="input_style" type="number" v-model="inputVal"  />
			<textarea v-if="isInput && typeInput=='textarea'" class="text-style" v-model="textareaVal" placeholder="请填写拒绝理由" />
			<view class="flex-lr btn_view" v-if="btnCount==2">
				<view class="btn-style glost" @click="cancel">取消</view>
				<view class="btn-style" @click="sure">确定</view>
			</view>
			<view v-else class="btn-style btn_view w_btn" @click="sure">确定</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'modal',
		data(){
			return{
				inputVal:'',
				textareaVal:''
			}
		},
		methods:{
			sure(){
				let val = ''
				if(this.isInput && this.typeInput == 'input'){
					val = this.inputVal
				}
				if(this.isInput && this.typeInput == 'textarea'){
					val = this.textareaVal
				}
				this.$emit('change','SURE',val)
			},
			cancel(){
				this.$emit('change','CANCEL')
			}
		},
		props:{
			title:{
				type:String,
				required:true,
			},
			tip:{
				type:String,
				required:false,
				default:''
			},
			isInput:{
				type:Boolean,
				required:false,
				default:false
			},
			typeInput:{
				type:String,
				required:false,
			},
			btnCount:{
				type:Number,
				required:false,
				default:2
			}
		}
	}
</script>

<style lang="less" scoped>
	.modal_con{
		width: 480rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		position: absolute;
		margin: 450rpx auto;
		box-sizing: border-box;
		padding: 60rpx 40rpx;
		left: 0;
		right: 0;
	}
	.input_style{
		width: 100%;
		box-sizing: border-box;
		height: 80rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		background: #F5F5F5;
		margin-top:42rpx;
	}
	.text-style{
		width: 100%;
		height: 200rpx;
		background: #F5F5F5;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding:20rpx;
		font-size: 24rpx;
		margin-top:42rpx;
	}
	.btn_view{
		margin: 0 auto;
		margin-top: 52rpx;
		&.w_btn{
			width: 300rpx;
		}
	}
</style>
