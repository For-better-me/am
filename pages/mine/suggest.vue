<template>
	<view class="suggest pad-lr-30">
		<view class="flex-lr flex-center type" @click="chooseType">
			<text class="f-32 color-1">信息类型</text>
			<view class="flex-center">
				<text class="f-32 color-1">{{type}}</text>
				<image src="../../static/img/icon_arrow.png" class="arrow mar-l-20"></image>
			</view>
		</view>
		<textarea v-model="text" placeholder="说点什么" class="textarea"/>
		<view class='pad-tb-30 border_bottom'>
			<view class='up_img' v-for="(img,i) in images" :key='img'>
				<image mode='aspectFill' :src='img' @click='preview(i)'></image>
				<view class='close' @click='del(i)'>
					<image src="../../static/img/icon_close.png" ></image>
				</view>
			</view>

			<view v-if="images.length<9" class='up_view' @click='chooseImg'>
				<image src='../../static/img/icon_upload.png'></image>
				<view>上传图片</view>
			</view>

		</View>
		<button type="primary" class="bg-blue mar-t-240" @click="submit()">提交</button>
	</view>
</template>

<script>
	import MyApi from '../../apis/my.js'
	export default {
		name: 'suggest',
		data() {
			return {
				images: [],
				type: '',
				text: ''
			}
		},
		methods: {
			submit() {
				if(!this.type){
					this.$util.showToast('请选择投诉建议类型')
					return
				}
				if(!this.text){
					this.$util.showToast('请输入投诉建议')
					return
				}
				let images = []
				if(this.images.length>0){
					images = this.$util.uploadFile(this.images)
				}
				let data = {
					type:this.type,
					text:this.text,
					images
				}
				MyApi.complain(data).then(res=>{
					this.$util.showToast('提交成功','success')
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			},
			chooseImg() {
				let count = 9 - this.images.length
				this.$util.uploadImg(count).then(data => {
					this.images = this.images.concat(data)
				})
			},
			del(i) {
				this.images = this.images.filter((el, index) => index != i)
			},
			preview(i) {
				this.$util.preImg(this.images, i)
			},
			chooseType(){
				let itemList = ['类型1','类型2']
				uni.showActionSheet({
					itemList,
					success:(res)=>{
						this.type = itemList[res.tapIndex]
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.suggest {
		height: 100vh;
		background: #fff;
	}
	.type{
		height: 97rpx;
		border-bottom: #E6E6E6 solid 1rpx;
	}
	.textarea {
		border: none;
		padding: 30rpx 0rpx;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.up_view {
		width: 210rpx;
		height: 210rpx;
		background: #F8F8F8;
		border-radius: 6rpx;
		text-align: center;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
		vertical-align: top;

		image {
			width: 44rpx;
			height: 44rpx;
		}

		View {
			font-size: 20rpx;
			color: #ccc;
			margin-top: 10rpx;
		}
	}

	.up_img {
		width: 210rpx;
		height: 210rpx;
		background: #F8F8F8;
		border-radius: 6rpx;
		position: relative;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		display: inline-block;
		vertical-align: top;

		&:nth-of-type(3n) {
			margin-right: 0;
		}

		image {
			width: 210rpx;
			height: 210rpx;
		}

		.close {
			position: absolute;
			right: 5rpx;
			z-index: 99;
			top: 5rpx;
			padding-left: 10rpx;
			padding-bottom: 10rpx;
			text-align: center;
			image{
				width: 22rpx;
				height: 22rpx;
				border-radius: 100%;
				background: #f5f5f5;
				background: rgba(#fff,0.6);
				padding: 10rpx;
			}
		}
	}

	.btn_style {
		margin: 50rpx auto;
	}
</style>
